import axios from 'axios';
import { getChainFeeTotals, getBridgeFeeTotals } from './fees';

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

const fetchTokenPriceData = async (denom: string): Promise<FetchTokenPriceDataResponse> => {
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
        CHEQ: 6,
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
  
      return {
        chainFeeTotalUSD,
        bridgeFeeTotalUSD,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        chainFeeTotalUSD: 0,
        bridgeFeeTotalUSD: 0,
      };
    }
  }
  