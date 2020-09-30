import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUsersTransactionsService from '../../../services/ListUsersTransactionsService';

class ListUsersTransactionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserTransactions = container.resolve(
      ListUsersTransactionsService,
    );

    const listTransactions = await listUserTransactions.execute(user_id);

    return response.json(listTransactions);
  }
}

export default ListUsersTransactionsController;
