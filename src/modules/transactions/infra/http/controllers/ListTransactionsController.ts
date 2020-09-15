import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTransactionsService from '../../../services/ListTransactionsService';

export default class ListTransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTransactions = container.resolve(ListTransactionsService);

    const transaction = await listTransactions.execute();

    return response.json(transaction);
  }
}
