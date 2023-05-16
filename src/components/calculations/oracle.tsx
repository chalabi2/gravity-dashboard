import axios from 'axios';
import { getChainFeeTotals, getBridgeFeeTotals, getTokenAmountTotals } from './fees';

type FetchTokenPriceDataResponse = {
  price: number;
};

type SymbolToCoinIdMap = {
  [key: string]: string;
};

const symbolToCoinIdMap: SymbolToCoinIdMap = {
  CANTO: 'canto',
  EVMOS: 'evmos',
  ATOM: 'atom',
  STARS: 'stars',
  CHEQ: 'cheq',
  HUAHUA: 'huahua',
  NYM: 'nym',
  FUND: 'unification',
  OSMO: 'osmosis'
};

export const fetchTokenPriceData = async (denom: string): Promise<FetchTokenPriceDataResponse> => {
    const symbol = denom;

  const supportedByGravityChain = ['DAI', 'USDT', 'USDC', 'WBTC', 'WETH', 'wstETH'].includes(symbol);

  if (supportedByGravityChain) {
    const response = await axios.get('https://info.gravitychain.io:9000/erc20_metadata');
    const data = response.data;

    let tokenData: any;

    if (symbol === 'USDC') {
      const usdcData = data.filter((item: any) => item.symbol === 'USDC');
      tokenData = usdcData[1]; // Choose the second item in the filtered array for USDC
    } else {
      tokenData = data.find((item: any) => item.symbol === symbol);
    }

    if (!tokenData) {
      throw new Error(`Token with symbol ${symbol} not found in the response`);
    }

    return {
      price: tokenData.exchange_rate / 1e6 // Convert to USD
    };
  } else {
    const coinId = symbolToCoinIdMap[symbol];

    if (!coinId) {
      throw new Error(`Token with symbol ${symbol} not found in the symbolToCoinIdMap`);
    }

    const response = await axios.get(`https://api-osmosis.imperator.co/tokens/v2/price/${coinId}`);
    const data = response.data;

    return {
      price: data.price
    };
  }
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
        CHEQ: 18,
        HUAHUA: 6,
        NYM: 6,
        FUND: 6

      };
  
      for (const chainFee of chainFeeTotals) {
        try {
          const tokenPriceData = await fetchTokenPriceData(chainFee.denom);

          const tokenPrice = tokenPriceData.price;
          const decimals = tokenDecimalsMap[chainFee.denom];
  
          if (decimals === undefined) {
            console.error(`Token decimals not found in tokenDecimalsMap for denom: ${chainFee.denom}`);
            continue;
          }
  
          const tokenAmount = formatAmount(chainFee.totalChainFees, decimals);
          const usdValue = tokenAmount * tokenPrice;
          chainFeeTransactionCount += chainFee.totalChainFees;

      if (isNaN(usdValue)) {
        console.error(`USD value (${chainFee.denom}) is NaN:`, {
          tokenAmount,
          tokenPrice,
          chainFee
        });
      } else {
        chainFeeTotalUSD += usdValue;
      }
          chainFeeCount++;
        } catch (error) {
          console.error(`Error processing chainFee for denom: ${chainFee.denom}`, error);
          continue;
        }
      }
  
      for (const bridgeFee of bridgeFeeTotals) {
        try {
          const tokenPriceData = await fetchTokenPriceData(bridgeFee.denom);
          const tokenPrice = tokenPriceData.price;
          const decimals = tokenDecimalsMap[bridgeFee.denom];
  
          if (decimals === undefined) {
            console.error(`Token decimals not found in tokenDecimalsMap for denom: ${bridgeFee.denom}`);
            continue;
          }
  
          const tokenAmount = formatAmount(bridgeFee.totalBridgeFees, decimals);
          const usdValue = tokenAmount * tokenPrice;
          bridgeFeeTransactionCount += bridgeFee.totalBridgeFees;

          if (isNaN(usdValue)) {
            console.error(`USD value (${bridgeFee.denom}) is NaN:`, {
              tokenAmount,
              tokenPrice,
              bridgeFee
            });
          } else {
            bridgeFeeTotalUSD += usdValue;
          }
          bridgeFeeCount++;
        } catch (error) {
          console.error(`Error processing bridgeFee for denom: ${bridgeFee.denom}`, error);
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

    let totalChainTransactions = 0;
    let totalBridgeTransactions = 0;
    let totalChainFeeUSD = 0;
    let totalBridgeFeeUSD = 0;

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
      CHEQ: 18,
      HUAHUA: 6,
      NYM: 6,
      FUND: 6

    };

    const chainFeeGroups: { [key: string]: number } = {};
    const bridgeFeeGroups: { [key: string]: number } = {};

    // Group by denom
    for (const chainFee of chainFeeTotals) {
      chainFeeGroups[chainFee.denom] = (chainFeeGroups[chainFee.denom] || 0) + chainFee.totalChainFees;
      totalChainTransactions += chainFee.totalChainFees;
    }

    for (const bridgeFee of bridgeFeeTotals) {
      bridgeFeeGroups[bridgeFee.denom] = (bridgeFeeGroups[bridgeFee.denom] || 0) + bridgeFee.totalBridgeFees;
      totalBridgeTransactions += bridgeFee.totalBridgeFees;
    }

    // Calculate total USD value
    for (const denom in chainFeeGroups) {

      const tokenPriceData = await fetchTokenPriceData(denom);
      const tokenPrice = tokenPriceData.price;
      const decimals = tokenDecimalsMap[denom];

      if (decimals === undefined) {
        console.error(`Token decimals not found in tokenDecimalsMap for denom: ${denom}`);
        continue;
      }

      const tokenAmount = formatAmount(chainFeeGroups[denom], decimals);

      const usdValue = tokenAmount * tokenPrice;
      totalChainFeeUSD += usdValue;
    }

    for (const denom in bridgeFeeGroups) {

      const tokenPriceData = await fetchTokenPriceData(denom);

      const tokenPrice = tokenPriceData.price;
      const decimals = tokenDecimalsMap[denom];

      if (decimals === undefined) {
        console.error(`Token decimals not found in tokenDecimalsMap for denom: ${denom}`);
        continue;
      }

      const tokenAmount = formatAmount(bridgeFeeGroups[denom], decimals);
      const usdValue = tokenAmount * tokenPrice;
      totalBridgeFeeUSD += usdValue;
    }

    // Calculate average USD value
    const averageChainFee = totalChainFeeUSD / totalChainTransactions;
    const averageBridgeFee = totalBridgeFeeUSD / totalBridgeTransactions;

    return {
      totalChainFeeUSD,
      totalBridgeFeeUSD,
      averageChainFee,
      averageBridgeFee,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      totalChainFeeUSD: 0,
      totalBridgeFeeUSD: 0,
      averageChainFee: 0,
      averageBridgeFee: 0,
    };
  }
}