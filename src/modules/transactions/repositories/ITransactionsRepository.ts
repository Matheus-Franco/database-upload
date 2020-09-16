import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IReturnType {
  transactions: Transaction[];
  balance: Balance;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface ITransactionsRepository {
  getBalance(): Promise<Balance>;
  createTransaction(data: ICreateTransactionDTO): Promise<Transaction>;
  findByID(id: string): Promise<Transaction | undefined>;
  findAll(): Promise<IReturnType>;
  deleteTransaction(id: string): Promise<void>;
  createByImport(filePath: string): Promise<Transaction[]>;
}
