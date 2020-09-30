import { injectable, inject } from 'tsyringe';

import ITransactionsRepository, {
  IReturnType,
} from '../repositories/ITransactionsRepository';

@injectable()
class ListUserTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(user_id: string): Promise<IReturnType> {
    const transactions = await this.transactionsRepository.findUsersTransactions(
      user_id,
    );

    return transactions;
  }
}

export default ListUserTransactionsService;
