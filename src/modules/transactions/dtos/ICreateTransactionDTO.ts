// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export default interface ICreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  description: string;
}
