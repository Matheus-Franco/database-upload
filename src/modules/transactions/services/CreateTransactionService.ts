import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  description: string;
  user_id: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    title,
    value,
    type,
    category,
    description,
    user_id,
  }: IRequest): Promise<Transaction> {
    const { total } = await this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('Beware of Debits!');
    }

    const transaction = await this.transactionsRepository.createTransaction({
      title,
      value,
      type,
      category,
      description,
      user_id,
    });

    return transaction;
  }
}

export default CreateTransactionService;
