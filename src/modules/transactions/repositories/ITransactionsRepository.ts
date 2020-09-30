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

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface ITransactionsRepository {
  getBalance(): Promise<Balance>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findByID(id: string): Promise<Transaction | undefined>;
  findAll(): Promise<IReturnType>;
  delete(id: string): Promise<void>;
  createByImport(filePath: string): Promise<Transaction[]>;
  findUsersTransactions(user_id: string): Promise<IReturnType>;
}
