import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '../../../services/CreateTransactionService';

export default class CreateTransactionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title, value, type, category, description } = request.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      title,
      value,
      type,
      category,
      description,
      user_id,
    });

    return response.json(transaction);
  }
}
