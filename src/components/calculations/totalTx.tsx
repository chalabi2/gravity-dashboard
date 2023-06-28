import axios from "axios";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(isSameOrBefore);
dayjs.extend(weekOfYear);

interface Transaction {
  block_number: number;
  transactions: any[]; 
  formatted_date: string;
}

export async function getTxAmt() {
  const response = await axios.get<Transaction[]>(`https://info.gravitychain.io:9000/transactions/send_to_eth`);

  const transactions = response.data;

  const today = dayjs();
  const weekStart = today.startOf('week');
  const monthStart = today.startOf('month');
  const yearStart = today.startOf('year');

  let dailyCount = 0;
  let weeklyCount = 0;
  let monthlyCount = 0;
  let yearlyCount = 0;
  let allTransactions = 0;

  transactions.forEach((transaction: Transaction) => {
    const date = dayjs(transaction.formatted_date.replace(/-/g, "/"), 'MM/DD/YYYY');

    if(date.isSameOrBefore(today) && date.isAfter(dayjs(today).subtract(1, 'day'))) {
      dailyCount += transaction.transactions.length;
    }
    if(date.isSameOrBefore(today) && date.isAfter(weekStart)) {
      weeklyCount += transaction.transactions.length;
    }
    if(date.isSameOrBefore(today) && date.isAfter(monthStart)) {
      monthlyCount += transaction.transactions.length;
    }
    if(date.isSameOrBefore(today) && date.isAfter(yearStart)) {
      yearlyCount += transaction.transactions.length;
    }
    allTransactions += transaction.transactions.length;
  });

  const counts = {
    daily: dailyCount,
    weekly: weeklyCount,
    monthly: monthlyCount,
    yearly: yearlyCount,
    allTime: allTransactions,
  };

  return counts;
}

