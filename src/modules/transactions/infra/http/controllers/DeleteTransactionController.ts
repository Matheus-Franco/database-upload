import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteTransactionService from '../../../services/DeleteTransactionService';

export default class DeleteTransactionController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTransaction = container.resolve(DeleteTransactionService);

    await deleteTransaction.execute({ id });

    return response.json({ message: 'Transactions was deleted.' });
  }
}
