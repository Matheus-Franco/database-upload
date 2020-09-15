import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTransactionByIdService from '../../../services/ListTransactionByIdService';

export default class ListTransactionByIdController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listTransactionById = container.resolve(ListTransactionByIdService);

    const transaction = await listTransactionById.execute({ id });

    return response.json(transaction);
  }
}
