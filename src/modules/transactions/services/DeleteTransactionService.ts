import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const transaction = await this.transactionsRepository.findByID(id);

    if (!transaction) {
      throw new AppError('Sorry, transaction not found.');
    }

    await this.transactionsRepository.delete(id);

    await this.transactionsRepository.getBalance();
  }
}

export default DeleteTransactionService;
