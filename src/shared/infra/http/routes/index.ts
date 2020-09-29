import { Router } from 'express';

import transactionsRouter from '../../../../modules/transactions/infra/http/routes/transactions.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/users', usersRouter);

export default routes;
