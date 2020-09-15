import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ImportTransactionsService from '../../../services/ImportTransactionsService';

export default class ImportTransactionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const importTransactions = container.resolve(ImportTransactionsService);

    const transactions = await importTransactions.execute(request.file.path);

    return response.json(transactions);
  }
}
