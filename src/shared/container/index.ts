import { container } from 'tsyringe';

import ITransactionsRepository from '../../modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '../../modules/transactions/infra/typeorm/repositories/TransactionsRepository';

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
