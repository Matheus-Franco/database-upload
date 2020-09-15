import { injectable, inject } from 'tsyringe';

import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class ImportTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(filePath: string): Promise<Transaction[]> {
    const transaction = await this.transactionsRepository.createByImport(
      filePath,
    );

    return transaction;
  }
}

export default ImportTransactionsService;
