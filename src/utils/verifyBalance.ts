import Transaction from '../modules/transactions/infra/typeorm/entities/Transaction';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IBalance {
  income: number;
  outcome: number;
  total: number;
}

export default function verifyBalance(array: Transaction[]): IBalance {
  const reduceFunc = array.reduce(
    (accumulator, transaction) => {
      switch (transaction.type) {
        case 'income':
          accumulator.income += Number(transaction.value);
          break;
        case 'outcome':
          accumulator.outcome += Number(transaction.value);
          break;
        default:
          break;
      }
      return accumulator;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  );

  return reduceFunc;
}
