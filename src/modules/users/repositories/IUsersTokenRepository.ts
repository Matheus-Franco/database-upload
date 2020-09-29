import UsersToken from '../infra/typeorm/entities/UsersToken';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface IUsersTokenRepository {
  generate(user_id: string): Promise<UsersToken>;
  findByToken(token: string): Promise<UsersToken | undefined>;
}
