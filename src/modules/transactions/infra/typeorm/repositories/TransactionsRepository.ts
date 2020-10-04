import { getRepository, Repository, In } from 'typeorm';
import fs from 'fs';
import csvParse from 'csv-parse';

import verifyBalance from '../../../../../utils/verifyBalance';

import ITransactionsRepository from '../../../repositories/ITransactionsRepository';
import Transaction from '../entities/Transaction';

import ICreateTransactionDTO from '../../../dtos/ICreateTransactionDTO';
import Category from '../entities/Category';
import AppError from '../../../../../shared/errors/AppError';

interface IBalance {
  income: number;
  outcome: number;
  total: number;
}

interface CSVtransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

interface IReturnType {
  transactions: Transaction[];
  balance: IBalance;
}

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  private ormCategoryRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
    this.ormCategoryRepository = getRepository(Category);
  }

  public async getBalance(): Promise<IBalance> {
    const transactions = await this.ormRepository.find();

    const { income, outcome } = verifyBalance(transactions);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public async create({
    category,
    description,
    title,
    type,
    value,
    user_id,
  }: ICreateTransactionDTO): Promise<Transaction> {
    let transactionCategoryName = await this.ormCategoryRepository.findOne({
      where: { title: category },
    });

    if (!transactionCategoryName) {
      transactionCategoryName = this.ormCategoryRepository.create({
        title: category,
      });

      await this.ormCategoryRepository.save(transactionCategoryName);
    }

    const transaction = this.ormRepository.create({
      title,
      value,
      type,
      category: transactionCategoryName,
      description,
      user_id,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async findByID(id: string): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne({
      where: { id },
    });

    return transaction;
  }

  public async findAll(): Promise<IReturnType> {
    const transactions = await this.ormRepository.find();
    const balance = await this.getBalance();

    return { transactions, balance };
  }

  public async delete(id: string): Promise<void> {
    const transaction = await this.ormRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new AppError('Transaction was not found.');
    }

    await this.ormRepository.remove(transaction);
  }

  public async createByImport(filePath: string): Promise<Transaction[]> {
    const contactsReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactsReadStream.pipe(parsers);

    const categories: string[] = [];
    const transactions: CSVtransaction[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((word: string) =>
        word.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const existentCategories = await this.ormCategoryRepository.find({
      where: { title: In(categories) },
    });

    const existentCategoriesTitle = existentCategories.map(
      (category: Category) => category.title,
    );

    const addCategoriesTitle = categories
      .filter(category => !existentCategoriesTitle.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const addNewCategories = this.ormCategoryRepository.create(
      addCategoriesTitle.map(title => ({
        title,
      })),
    );

    await this.ormCategoryRepository.save(addNewCategories);

    const allCategories = [...addNewCategories, ...existentCategories];

    const createdTransactions = this.ormRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: allCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    await this.ormRepository.save(createdTransactions);

    await fs.promises.unlink(filePath);

    return createdTransactions;
  }

  public async findUsersTransactions(user_id: string): Promise<IReturnType> {
    const transactionsWithoutFilter = await this.ormRepository.find();

    const transactions = transactionsWithoutFilter.filter(
      each => each.user_id === user_id,
    );

    const { income, outcome } = verifyBalance(transactions);

    const total = income - outcome;

    return { transactions, balance: { income, outcome, total } };
  }
}

export default TransactionsRepository;
