import { getRepository, Repository } from 'typeorm';

import IUsersTokenRepository from '../../../repositories/IUsersTokenRepository';

import UsersToken from '../entities/UsersToken';

class UsersTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UsersToken>;

  constructor() {
    this.ormRepository = getRepository(UsersToken);
  }

  public async findByToken(token: string): Promise<UsersToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UsersToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokenRepository;
