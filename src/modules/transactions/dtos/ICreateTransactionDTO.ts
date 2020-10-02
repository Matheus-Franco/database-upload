export default interface ICreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  description: string;
  user_id: string;
}
