import { injectable, inject } from 'tsyringe';

import ITransactionsRepository, {
  IReturnType,
} from '../repositories/ITransactionsRepository';

@injectable()
class ListTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(): Promise<IReturnType> {
    const transactions = await this.transactionsRepository.findAll();

    return transactions;
  }
}

export default ListTransactionsService;
