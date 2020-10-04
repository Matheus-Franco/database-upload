import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthUserService from '../../../services/AuthUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUser = container.resolve(AuthUserService);

    const { token, user } = await authUser.execute({ email, password });

    return response.json({ user, token });
  }
}
