import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListTransactionByIdService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findByID(id);

    if (!transaction) {
      throw new AppError('Transaction was not found.');
    }

    return transaction;
  }
}

export default ListTransactionByIdService;
