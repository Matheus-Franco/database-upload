import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';

export interface IBalance {
  income: number;
  outcome: number;
  total: number;
}

export interface IReturnType {
  transactions: Transaction[];
  balance: IBalance;
}

export default interface ITransactionsRepository {
  getBalance(): Promise<IBalance>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findByID(id: string): Promise<Transaction | undefined>;
  findAll(): Promise<IReturnType>;
  delete(id: string): Promise<void>;
  createByImport(filePath: string): Promise<Transaction[]>;
  findUsersTransactions(user_id: string): Promise<IReturnType>;
}
