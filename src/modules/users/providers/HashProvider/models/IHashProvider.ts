// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
