import Transaction from '../infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface ITransactionsRepository {
  getBalance(): Promise<Balance>;
  createTransaction(data: ICreateTransactionDTO): Promise<Transaction>;
  findByID(id: string): Promise<Transaction | undefined>;
  findAll(): Promise<Transaction[]>;
  deleteTransaction(id: string): Promise<void>;
  createByImport(filePath: string): Promise<Transaction[]>;
}
