import axios from "axios";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);

interface Transaction {
  block_number: number;
  transactions: any[]; // change `any` to the actual type of a transaction
  formatted_date: string;
}

export async function getTxAmt() {
  const response = await axios.get<Transaction[]>(`http://66.172.36.132:9000/transactions/send_to_eth`);

  const transactions = response.data;

  let dailyTransactions: { [key: string]: number } = {};
  let weeklyTransactions: { [key: string]: number } = {};
  let monthlyTransactions: { [key: string]: number } = {};
  let yearlyTransactions: { [key: string]: number } = {};
  let allTransactions = 0;

  transactions.forEach((transaction: Transaction) => {
    const date = dayjs(transaction.formatted_date, 'MM-DD-YYYY');
    const week = date.week();
    const month = date.month();
    const year = date.year();

    dailyTransactions[date.format('MM-DD-YYYY')] = (dailyTransactions[date.format('MM-DD-YYYY')] || 0) + transaction.transactions.length;
    weeklyTransactions[`${year}-${week}`] = (weeklyTransactions[`${year}-${week}`] || 0) + transaction.transactions.length;
    monthlyTransactions[`${year}-${month}`] = (monthlyTransactions[`${year}-${month}`] || 0) + transaction.transactions.length;
    yearlyTransactions[year] = (yearlyTransactions[year] || 0) + transaction.transactions.length;
    allTransactions += transaction.transactions.length;
  });

  const averages = {
    daily: calculateAverage(Object.values(dailyTransactions)),
    weekly: calculateAverage(Object.values(weeklyTransactions)),
    monthly: calculateAverage(Object.values(monthlyTransactions)),
    yearly: calculateAverage(Object.values(yearlyTransactions)),
    allTime: allTransactions,
  };

  return averages;
}

function calculateAverage(array: number[]): number {
  if (array.length === 0) return 0;
  const sum = array.reduce((a: number, b: number) => a + b, 0);
  return sum / array.length;
}
