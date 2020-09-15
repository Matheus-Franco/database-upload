import { injectable, inject } from 'tsyringe';

import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class ListTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.findAll();

    return transactions;
  }
}

export default ListTransactionsService;
