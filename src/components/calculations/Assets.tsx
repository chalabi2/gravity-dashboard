import axios from "axios";

import { gravityDenomToStringMap, Amount } from "../../types";
import { fetchTokenPriceData } from "./oracle"

const formatAmount = (amount: number, decimals: number) => {
    return amount / Math.pow(10, decimals);
  };

  function formatTotalAmount(amount: number, decimals: number): string {
    const formattedAmount = amount / Math.pow(10, decimals);
    return formattedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

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
    FUND: 6

  };

  export async function getTokenAmountTotals() {
    try {
        const response = await axios.get("https://info.gravitychain.io:9000/transactions/send_to_eth");
        const data = response.data;

        const tokensByDenom: Record<string, number> = {};

        data.forEach((entry: { data: { amount: Amount[]; }; }) => {
            if (entry.data.amount.length > 0) {
                const tokens = entry.data.amount[0];
                const denom = tokens.denom;
                const amount = parseInt(tokens.amount, 10);

                const readableDenom = gravityDenomToStringMap[denom] || denom;
                if (tokensByDenom[readableDenom]) {
                    tokensByDenom[readableDenom] += amount;
                } else {
                    tokensByDenom[readableDenom] = amount;
                }
            }
        });

        const resultPromises = Object.keys(tokensByDenom)
            .filter((denom) => tokenDecimalsMap.hasOwnProperty(denom))
            .map(async (denom, index) => {
                try {
                    const tokenPriceData = await fetchTokenPriceData(denom);
                    if (tokenPriceData.price === undefined) {
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
                        totalValue: totalValue
                    };
                } catch (error) {
                    return null;
                }
            });

            let result = await Promise.all(resultPromises);

            // Filter out null or undefined results
            result = result.filter((item): item is { denom: string; totalAmounts: string; price: string; totalValue: number } => item !== null);
            
            // Explicitly define the type for the array with a type assertion
            const sortedResult = result as { denom: string; totalAmounts: string; price: string; totalValue: number }[];
            
            // Sort by total value
            sortedResult.sort((a, b) => b.totalValue - a.totalValue);
            
            // Limit to top 6
            const topResult = sortedResult.slice(0, 6);
            
            return topResult;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}