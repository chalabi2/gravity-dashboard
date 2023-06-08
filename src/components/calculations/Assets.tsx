import { gravityDenomToStringMap } from "../../types";
import { fetchTokenPriceData } from "./oracle";
import { fetchSendToEthTime } from "./feeQuery";

const formatAmount = (amount: number, decimals: number) => {
  return amount / Math.pow(10, decimals);
};

function formatTotalAmount(amount: number, decimals: number): string {
  const formattedAmount = amount / Math.pow(10, decimals);
  return formattedAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const tokenDecimalsMap: { [key: string]: number } = {
  DAI: 18,
  USDT: 6,
  USDC: 6,
  WBTC: 8,
  WETH: 18,
  wstETH: 18,
  ATOM: 6,
  UMEE: 6,
  stkATOM: 6,
  AXL: 6,
  SOMM: 6,
  ISLM: 6,
  UND: 6,
  NYM_Duplicate: 6,
  CMDX: 6,
  KUJI: 6,
  LUNA: 6,
  MNTL: 6,
  USK: 6,
  USD: 6,
  PLANQ: 6,
  STARS: 6,
  CHEQ: 9,
  HUAHUA: 6,
  NYM: 6,
  FUND: 6,
};

export async function getTokenAmountTotals() {
  try {
    const response = await fetchSendToEthTime();
    const entries = response.data.time_frames[4].amount_totals;

    const tokensByDenom: Record<string, number> = {};

    for (let [denom, amount] of Object.entries(entries)) {
      const readableDenom = gravityDenomToStringMap[denom] || denom;

      const numAmount = Number(amount);

      if (tokensByDenom[readableDenom]) {
        tokensByDenom[readableDenom] += numAmount;
      } else {
        tokensByDenom[readableDenom] = numAmount;
      }
    }

    const resultPromises = Object.keys(tokensByDenom)
      .filter((denom) => tokenDecimalsMap.hasOwnProperty(denom))
      .map(async (denom, index) => {
        try {
          const tokenPriceData = await fetchTokenPriceData(denom);
          if (tokenPriceData === null || tokenPriceData.price === undefined) {
            return null;
          }
          const tokenPrice = tokenPriceData.price;

          const decimals = tokenDecimalsMap[denom];
          const formattedAmount = formatAmount(tokensByDenom[denom], decimals);
          const totalValue = formattedAmount * tokenPrice;
          return {
            denom,
            totalAmounts: formatTotalAmount(tokensByDenom[denom], decimals),
            price: formatTotalAmount(tokenPrice, 0),
            totalValue: totalValue,
          };
        } catch (error) {
          return null;
        }
      });

    let result = await Promise.all(resultPromises);

    result = result.filter(
      (
        item
      ): item is {
        denom: string;
        totalAmounts: string;
        price: string;
        totalValue: number;
      } => item !== null
    );

    const sortedResult = result as {
      denom: string;
      totalAmounts: string;
      price: string;
      totalValue: number;
    }[];

    sortedResult.sort((a, b) => b.totalValue - a.totalValue);

    const topResult = sortedResult.slice(0, 6);

    return topResult;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
