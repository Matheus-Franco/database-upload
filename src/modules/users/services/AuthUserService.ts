import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import auth from '../../../config/auth';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IRequest {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User was not found.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Your credentials are incorrect.', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthUserService;
