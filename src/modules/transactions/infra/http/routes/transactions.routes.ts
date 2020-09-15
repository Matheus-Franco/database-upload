import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../../config/upload';

import CreateTransactionController from '../controllers/CreateTransactionController';
import DeleteTransactionController from '../controllers/DeleteTransactionController';
import ImportTransactionController from '../controllers/ImportTransactionController';
import ListTransactionByIdController from '../controllers/ListTransactionByIdController';
import ListTransactionsController from '../controllers/ListTransactionsController';

const createTransactionController = new CreateTransactionController();
const deleteTransactionController = new DeleteTransactionController();
const importTransactionController = new ImportTransactionController();
const listTransactionByIdController = new ListTransactionByIdController();
const listTransactionsController = new ListTransactionsController();

const upload = multer(uploadConfig);

const transactionsRouter = Router();

transactionsRouter.get('/', listTransactionsController.index);
transactionsRouter.get('/:id', listTransactionByIdController.index);
transactionsRouter.post('/', createTransactionController.create);
transactionsRouter.post(
  '/import',
  upload.single('file'),
  importTransactionController.create,
);
transactionsRouter.delete('/:id', deleteTransactionController.delete);

export default transactionsRouter;
