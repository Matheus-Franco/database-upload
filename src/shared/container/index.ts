import { container } from 'tsyringe';

import '../../modules/users/providers';

import ITransactionsRepository from '../../modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '../../modules/transactions/infra/typeorm/repositories/TransactionsRepository';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '../../modules/users/repositories/IUsersTokenRepository';
import UsersTokenRepository from '../../modules/users/infra/typeorm/repositories/UsersTokenRepository';

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokenRepository',
  UsersTokenRepository,
);
