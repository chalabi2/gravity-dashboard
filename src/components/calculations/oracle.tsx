/* tslint:disable */
import axios from "axios";
import { getChainFeeTotals, getBridgeFeeTotals } from "./fees";

type FetchTokenPriceDataResponse = {
  price: number;
};

type SymbolToCoinIdMap = {
  [key: string]: string;
};

const symbolToCoinIdMap: SymbolToCoinIdMap = {
  CANTO: "canto",
  EVMOS: "evmos",
  ATOM: "atom",
  STARS: "stars",
  CHEQ: "cheq",
  HUAHUA: "huahua",
  NYM: "nym",
  FUND: "unification",
  OSMO: "osmosis",
};

interface TokenPriceData {
  [key: string]: {
    status: "pending" | "resolved";
    data: Promise<FetchTokenPriceDataResponse>;
  };
}
const tokenPriceDataCache: TokenPriceData = {};

export const fetchTokenPriceData = async (
  denom: string
): Promise<FetchTokenPriceDataResponse> => {
  const symbol = denom;

  if (
    tokenPriceDataCache[symbol] &&
    tokenPriceDataCache[symbol].status === "resolved"
  ) {
    return tokenPriceDataCache[symbol].data;
  }

  if (symbol === "nym" || symbol === "unification") {
    return {
      price: 0,
    };
  }

  const supportedByGravityChain = [
    "DAI",
    "USDT",
    "USDC",
    "WBTC",
    "WETH",
    "wstETH",
  ].includes(symbol);

  const fetchPrice = async () => {
    if (supportedByGravityChain) {
      const response = await axios.get(
        "https://info.gravitychain.io:9000/erc20_metadata"
      );
      const data = response.data;

      let tokenData: any;

      if (symbol === "USDC") {
        const usdcData = data.filter((item: any) => item.symbol === "USDC");
        tokenData = usdcData[1];
      } else {
        tokenData = data.find((item: any) => item.symbol === symbol);
      }

      if (!tokenData) {
        throw new Error(
          `Token with symbol ${symbol} not found in the response`
        );
      }

      return {
        price: tokenData.exchange_rate / 1e6,
      };
    } else {
      const coinId = symbolToCoinIdMap[symbol];

      if (!coinId) {
        throw new Error(
          `Token with symbol ${symbol} not found in the symbolToCoinIdMap`
        );
      }

      const response = await axios.get(
        `https://api-osmosis.imperator.co/tokens/v2/price/${coinId}`
      );
      const data = response.data;

      return {
        price: data.price,
      };
    }
  };
  const pricePromise = fetchPrice();

  tokenPriceDataCache[symbol] = { status: "pending", data: pricePromise };

  pricePromise.then(() => {
    tokenPriceDataCache[symbol].status = "resolved";
  });

  return pricePromise;
};

const formatAmount = (amount: number, decimals: number) => {
  return amount / Math.pow(10, decimals);
};

export async function getCombinedFeeData() {
  try {
    const chainFeeTotals = await getChainFeeTotals();

    const bridgeFeeTotals = await getBridgeFeeTotals();

    let chainFeeTotalUSD = 0;
    let bridgeFeeTotalUSD = 0;
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    let chainFeeCount = 0;
    let bridgeFeeCount = 0;
    let chainFeeTransactionCount = 0;
    let bridgeFeeTransactionCount = 0;

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

    for (const chainFee of chainFeeTotals) {
      try {
        const tokenPriceData = await fetchTokenPriceData(chainFee.denom);

        const tokenPrice = tokenPriceData.price;
        const decimals = tokenDecimalsMap[chainFee.denom];

        if (decimals === undefined) {
          console.error(
            `Token decimals not found in tokenDecimalsMap for denom: ${chainFee.denom}`
          );
          continue;
        }

        const tokenAmount = formatAmount(chainFee.totalChainFees, decimals);
        const usdValue = tokenAmount * tokenPrice;
        chainFeeTransactionCount += chainFee.totalChainFees;

        if (isNaN(usdValue)) {
          console.error(`USD value (${chainFee.denom}) is NaN:`, {
            tokenAmount,
            tokenPrice,
            chainFee,
          });
        } else {
          chainFeeTotalUSD += usdValue;
        }
        chainFeeCount++;
      } catch (error) {
        console.error(
          `Error processing chainFee for denom: ${chainFee.denom}`,
          error
        );
        continue;
      }
    }

    for (const bridgeFee of bridgeFeeTotals) {
      try {
        const tokenPriceData = await fetchTokenPriceData(bridgeFee.denom);
        const tokenPrice = tokenPriceData.price;
        const decimals = tokenDecimalsMap[bridgeFee.denom];

        if (decimals === undefined) {
          console.error(
            `Token decimals not found in tokenDecimalsMap for denom: ${bridgeFee.denom}`
          );
          continue;
        }

        const tokenAmount = formatAmount(bridgeFee.totalBridgeFees, decimals);
        const usdValue = tokenAmount * tokenPrice;
        bridgeFeeTransactionCount += bridgeFee.totalBridgeFees;

        if (isNaN(usdValue)) {
          console.error(`USD value (${bridgeFee.denom}) is NaN:`, {
            tokenAmount,
            tokenPrice,
            bridgeFee,
          });
        } else {
          bridgeFeeTotalUSD += usdValue;
        }
        bridgeFeeCount++;
      } catch (error) {
        console.error(
          `Error processing bridgeFee for denom: ${bridgeFee.denom}`,
          error
        );
        continue;
      }
    }

    const averageChainFee = chainFeeTotalUSD / chainFeeTransactionCount;
    const averageBridgeFee = bridgeFeeTotalUSD / bridgeFeeTransactionCount;

    return {
      chainFeeTotalUSD,
      bridgeFeeTotalUSD,
      averageChainFee,
      averageBridgeFee,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      chainFeeTotalUSD: 0,
      bridgeFeeTotalUSD: 0,
      averageChainFee: 0,
      averageBridgeFee: 0,
    };
  }
}

export async function getAverageFees() {
  try {
    const chainFeeTotals = await getChainFeeTotals();
    const bridgeFeeTotals = await getBridgeFeeTotals();

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

    let denomCount = 0;
    let sumOfAverageChainFees = 0;
    let sumOfAverageBridgeFees = 0;
    // eslint-disable-next-line
    let totalEntries = 0;

    const denoms = new Set([
      ...chainFeeTotals.map((fee) => fee.denom),
      ...bridgeFeeTotals.map((fee) => fee.denom),
    ]);
    for (const denom of Array.from(denoms)) {
      try {
        const tokenPriceData = await fetchTokenPriceData(denom);
        const tokenPrice = tokenPriceData.price;
        const decimals = tokenDecimalsMap[denom];

        if (decimals === undefined || isNaN(tokenPrice)) {
          console.error(
            `Token decimals not found in tokenDecimalsMap or tokenPrice is NaN for denom: ${denom}`
          );
          continue;
        }

        const chainFeesForDenom = chainFeeTotals.filter(
          (fee) => fee.denom === denom
        );
        const bridgeFeesForDenom = bridgeFeeTotals.filter(
          (fee) => fee.denom === denom
        );

        let totalChainFeesInUSD = 0;
        let totalBridgeFeesInUSD = 0;

        for (let fee of chainFeesForDenom) {
          totalChainFeesInUSD +=
            formatAmount(fee.totalChainFees, decimals) * tokenPrice;
        }

        for (let fee of bridgeFeesForDenom) {
          totalBridgeFeesInUSD +=
            formatAmount(fee.totalBridgeFees, decimals) * tokenPrice;
          totalEntries++;
        }

        const averageChainFeeForDenom =
          totalChainFeesInUSD / chainFeesForDenom.length;
        const averageBridgeFeeForDenom =
          totalBridgeFeesInUSD / bridgeFeesForDenom.length;

        sumOfAverageChainFees += averageChainFeeForDenom;
        sumOfAverageBridgeFees += averageBridgeFeeForDenom;

        denomCount++;
      } catch (error) {}
    }

    const averageChainFee = (
      sumOfAverageChainFees /
      denomCount /
      16152
    ).toFixed(2);
    const averageBridgeFee = (
      sumOfAverageBridgeFees /
      denomCount /
      16152
    ).toFixed(2);

    const mostCommonChainFeeDenom = getMostCommonDenom(chainFeeTotals) || "";
    const mostCommonBridgeFeeDenom = getMostCommonDenom(bridgeFeeTotals) || "";

    return {
      averageChainFee,
      averageBridgeFee,
      mostCommonChainFeeDenom,
      mostCommonBridgeFeeDenom,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      averageChainFee: "0.00",
      averageBridgeFee: "0.00",
      mostCommonChainFeeDenom: "",
      mostCommonBridgeFeeDenom: "",
    };
  }
}

function getMostCommonDenom(feeTotals: { denom: string }[]) {
  const denomCountMap: { [denom: string]: number } = {};

  for (let fee of feeTotals) {
    if (!denomCountMap[fee.denom]) {
      denomCountMap[fee.denom] = 0;
    }

    denomCountMap[fee.denom]++;
  }

  let mostCommonDenom = null;
  let maxCount = 0;

  for (let denom in denomCountMap) {
    if (denomCountMap[denom] > maxCount) {
      mostCommonDenom = denom;
      maxCount = denomCountMap[denom];
    }
  }

  return mostCommonDenom;
}
