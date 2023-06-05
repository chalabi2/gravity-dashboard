import axios from "axios";
import moment from 'moment';

import { gravityDenomToStringMap, tokenDecimalsMap } from "../../types";
import { fetchTokenPriceData } from "./oracle"
import { getTxAmt } from "./totalTx";


function convertRawAmount(token: string, amount: number) {
    const decimals = tokenDecimalsMap[token];
    const convertedAmount = amount / Math.pow(10, decimals);
    return Number(convertedAmount.toFixed(2));
  }

type TransactionResponse = {
  time_frames: {
    period: string,
    bridge_fee_totals: { [key: string]: number },
    chain_fee_totals: { [key: string]: number },
  }[]
};

function convertGravityDenom(denom: string) {
    return gravityDenomToStringMap[denom] || denom;
  }

export async function getFees() {
  try {
    const response = await axios.get<TransactionResponse>('http://66.172.36.132:9000/transactions/send_to_eth/time');

    if (response.status !== 200) {
      console.error(`Failed to fetch fees with status ${response.status}`);
      return;
    }

    if (!response.data.time_frames || response.data.time_frames.length === 0) {
      console.error('No time frames in the response');
      return;
    }

    const oneDayBridgeFees = response.data.time_frames[0].bridge_fee_totals;
    const oneDayChainFees = response.data.time_frames[0].chain_fee_totals;
    const oneWeekBridgeFees = response.data.time_frames[1].bridge_fee_totals;
    const oneWeekChainFees = response.data.time_frames[1].chain_fee_totals;
    const oneMonthBridgeFees = response.data.time_frames[2].bridge_fee_totals;
    const oneMonthChainFees = response.data.time_frames[2].chain_fee_totals;
    const oneYearBridgeFees = response.data.time_frames[3].bridge_fee_totals;
    const oneYearChainFees = response.data.time_frames[3].chain_fee_totals;
    const allTimeBridgeFees = response.data.time_frames[4].bridge_fee_totals;
    const allTimeChainFees = response.data.time_frames[4].chain_fee_totals;

    const oneDayBridgeFeesFormatted: { [key: string]: Number } = {};
    const oneDayChainFeesFormatted: { [key: string]: Number } = {};
    const oneWeekBridgeFeesFormatted: { [key: string]: Number } = {};
    const oneWeekChainFeesFormatted: { [key: string]: Number } = {};
    const oneMonthBridgeFeesFormatted: { [key: string]: Number } = {};
    const oneMonthChainFeesFormatted: { [key: string]: Number } = {};
    const oneYearBridgeFeesFormatted: { [key: string]: Number } = {};
    const oneYearChainFeesFormatted: { [key: string]: Number } = {};
    const allTimeBridgeFeesFormatted: { [key: string]: Number } = {};
    const allTimeChainFeesFormatted: { [key: string]: Number } = {};

    for (const [denom, amount] of Object.entries(oneDayBridgeFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        oneDayBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(oneDayChainFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        oneDayChainFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(oneWeekBridgeFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        oneWeekBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(oneWeekChainFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        oneWeekChainFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(oneMonthBridgeFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        oneMonthBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(oneMonthChainFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        oneMonthChainFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(oneYearBridgeFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        oneYearBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(oneYearChainFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        oneYearChainFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(allTimeBridgeFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        allTimeBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

      for (const [denom, amount] of Object.entries(allTimeChainFees)) {
        const humanReadableDenom = convertGravityDenom(denom);
        allTimeChainFeesFormatted[humanReadableDenom] = convertRawAmount(humanReadableDenom, amount);
      }

    return {
      oneDayBridgeFees: oneDayBridgeFeesFormatted,
      oneDayChainFees: oneDayChainFeesFormatted,
      oneWeekBridgeFees: oneWeekBridgeFeesFormatted,
      oneWeekChainFees: oneWeekChainFeesFormatted,
      oneMonthBridgeFees: oneMonthBridgeFeesFormatted,
      oneMonthChainFees: oneMonthChainFeesFormatted,
      oneYearBridgeFees: oneYearBridgeFeesFormatted,
      oneYearChainFees: oneYearChainFeesFormatted,
      allTimeBridgeFees: allTimeBridgeFeesFormatted,
      allTimeChainFees: allTimeChainFeesFormatted
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export async function getAverageFees() {
  try {
    const response = await axios.get('http://66.172.36.132:9000/transactions/send_to_eth/time');
    const data = response.data;

    const averageFeesPerTimeFrame = [];

    let { daily, weekly, monthly, yearly, allTime } = await getTxAmt();
    const bridgeFeeTransactionCount = await getTxAmt();
    const chainFeeAllTimeTx = allTime - 10693
    
    const transactionCountsAuto = [daily, weekly, monthly, 17028];
    const chainFeeTransactionCounts = [daily, weekly, monthly, 6327];

    for (let index = 0; index < data.time_frames.length; index++) {
      const time_frame = data.time_frames[index];

      const chainFeeTotals = time_frame?.chain_fee_totals || [];
      const bridgeFeeTotals = time_frame?.bridge_fee_totals || [];

      let denomCount = 0;
      let sumOfAverageChainFees = 0;
      let sumOfAverageBridgeFees = 0;

      const denoms = new Set([
        ...Object.keys(chainFeeTotals).filter(denom => gravityDenomToStringMap.hasOwnProperty(denom) && tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom])),
        ...Object.keys(bridgeFeeTotals).filter(denom => gravityDenomToStringMap.hasOwnProperty(denom) && tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom])),
      ]);

      const promises = Array.from(denoms).map(async (denom) => {
        try {
          const humanReadableDenom = gravityDenomToStringMap[denom];
          const tokenPriceData = await fetchTokenPriceData(humanReadableDenom);
          const tokenPrice = tokenPriceData.price;
          const decimals = tokenDecimalsMap[humanReadableDenom];

          if (decimals === undefined || isNaN(tokenPrice)) {
            //console.error(`Token decimals not found in tokenDecimalsMap or tokenPrice is NaN for denom: ${humanReadableDenom}`);
            return;
          }

          const totalChainFeesInUSD = (chainFeeTotals[denom] / Math.pow(10, decimals)) * tokenPrice;
          const totalBridgeFeesInUSD = (bridgeFeeTotals[denom] / Math.pow(10, decimals)) * tokenPrice;

          sumOfAverageChainFees += totalChainFeesInUSD;
          sumOfAverageBridgeFees += totalBridgeFeesInUSD;

          denomCount++;
        } catch (error) {
          //console.error(`Error processing fees for denom: ${denom}`, error);
        }
      });

      await Promise.all(promises);

      const transactionCountAuto = transactionCountsAuto[index] || 0;
      const chainFeeTransactionCount = chainFeeTransactionCounts[index] || 0;

      const averageChainFee = chainFeeTransactionCount ? (sumOfAverageChainFees / chainFeeTransactionCount).toFixed(2) : "0.00";
      const averageBridgeFee = transactionCountAuto ? (sumOfAverageBridgeFees / transactionCountAuto).toFixed(2) : "0.00";

      let mostCommonChainFeeDenom = getMostCommonDenom(chainFeeTotals);
      mostCommonChainFeeDenom = mostCommonChainFeeDenom !== null ? gravityDenomToStringMap[mostCommonChainFeeDenom] : "";

      let mostCommonBridgeFeeDenom = getMostCommonDenom(bridgeFeeTotals);
      mostCommonBridgeFeeDenom = mostCommonBridgeFeeDenom !== null ? gravityDenomToStringMap[mostCommonBridgeFeeDenom] : "";

      averageFeesPerTimeFrame.push({
        averageChainFee,
        averageBridgeFee,
        mostCommonChainFeeDenom,
        mostCommonBridgeFeeDenom,
      });
    }

    return averageFeesPerTimeFrame;

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

export async function getAverageFeesTwo() {
  try {
    const response = await axios.get('http://66.172.36.132:9000/transactions/send_to_eth');
    const transactions = response.data;

    const timeFrames = ['daily', 'weekly', 'monthly', 'allTime'];
    const averageFeesPerTimeFrame = [];

    for (const timeFrame of timeFrames) {
      let sumOfChainFeesInUSD = 0;
      let sumOfBridgeFeesInUSD = 0;
      let transactionCount = 0;

      for (const transaction of transactions) {
        // Make sure the transaction is within the time frame
        if (isWithinTimeFrame(transaction.formatted_date, timeFrame)) {
          const chainFee = transaction.transactions[0].data.chain_fee;
          const bridgeFee = transaction.transactions[0].data.bridge_fee;

          // Check if chainFee array is not empty
          if (chainFee.length > 0) {
            // Calculate total chain fee in USD
            for (const fee of chainFee) {
              if (fee.denom) { // Add a null check for fee.denom
                const denom = fee.denom;
                const humanReadableDenom = gravityDenomToStringMap[denom];
                try {
                  const tokenPriceData = await fetchTokenPriceData(humanReadableDenom);
                  const tokenPrice = tokenPriceData.price;
                  const decimals = tokenDecimalsMap[humanReadableDenom];

                  if (decimals !== undefined && !isNaN(tokenPrice)) {
                    sumOfChainFeesInUSD += (fee.amount / Math.pow(10, decimals)) * tokenPrice;
                  }
                } catch (error) {
                  console.error("Error fetching token price:", error);
                }
              }
            }

            // Increment transactionCount only if chainFee array is not empty
            if (chainFee.length > 0) {
              transactionCount++;
            }
          }

          // Calculate total bridge fee in USD
          for (const fee of bridgeFee) {
            if (fee.denom) { // Add a null check for fee.denom
              const denom = fee.denom;
              const humanReadableDenom = gravityDenomToStringMap[denom];
              try {
                const tokenPriceData = await fetchTokenPriceData(humanReadableDenom);
                const tokenPrice = tokenPriceData.price;
                const decimals = tokenDecimalsMap[humanReadableDenom];

                if (decimals !== undefined && !isNaN(tokenPrice)) {
                  sumOfBridgeFeesInUSD += (fee.amount / Math.pow(10, decimals)) * tokenPrice;
                }
              } catch (error) {
                console.error("Error fetching token price:", error);
              }
            }
          }

          transactionCount++;
        }
      }

      // Calculate averages
      const averageChainFee = transactionCount ? (sumOfChainFeesInUSD / transactionCount).toFixed(2) : "0.00";
      const averageBridgeFee = transactionCount ? (sumOfBridgeFeesInUSD / transactionCount).toFixed(2) : "0.00";

      averageFeesPerTimeFrame.push({
        averageChainFee,
        averageBridgeFee,
      });
    }

    return averageFeesPerTimeFrame;

  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      averageChainFee: "0.00",
      averageBridgeFee: "0.00",
    };
  }
}


function isWithinTimeFrame(formattedDate: string, timeFrame: string) {
  const date = moment(formattedDate, "MM-DD-YYYY");
  const now = moment();

  switch(timeFrame) {
    case 'daily':
      return now.diff(date, 'days') < 1;
    case 'weekly':
      return now.diff(date, 'weeks') < 1;
    case 'monthly':
      return now.diff(date, 'months') < 1;
    case 'allTime':
      return true;
    default:
      return false;
  }
}

export async function getCombinedFeeData() {
  try {
    const response = await axios.get('http://66.172.36.132:9000/transactions/send_to_eth/time');
    const data = response.data;

    const feeTotalsPerTimeFrame = [];

    for (let index = 0; index < data.time_frames.length; index++) {
      const time_frame = data.time_frames[index];

      const chainFeeTotals = time_frame?.chain_fee_totals || [];
      const bridgeFeeTotals = time_frame?.bridge_fee_totals || [];

      let totalChainFeeUSD = 0;
      let totalBridgeFeeUSD = 0;

      const denoms = new Set([
        ...Object.keys(chainFeeTotals).filter(denom => gravityDenomToStringMap.hasOwnProperty(denom) && tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom])),
        ...Object.keys(bridgeFeeTotals).filter(denom => gravityDenomToStringMap.hasOwnProperty(denom) && tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom])),
      ]);

      const promises = Array.from(denoms).map(async (denom) => {
        try {
          const humanReadableDenom = gravityDenomToStringMap[denom];
          const tokenPriceData = await fetchTokenPriceData(humanReadableDenom);
          const tokenPrice = tokenPriceData.price;
          const decimals = tokenDecimalsMap[humanReadableDenom];

          if (decimals === undefined || isNaN(tokenPrice)) {
            //console.error(`Token decimals not found in tokenDecimalsMap or tokenPrice is NaN for denom: ${humanReadableDenom}`);
            return;
          }

          totalChainFeeUSD += (chainFeeTotals[denom] / Math.pow(10, decimals)) * tokenPrice;
          totalBridgeFeeUSD += (bridgeFeeTotals[denom] / Math.pow(10, decimals)) * tokenPrice;
        } catch (error) {
          //console.error(`Error processing fees for denom: ${denom}`, error);
        }
      });

      await Promise.all(promises);

      feeTotalsPerTimeFrame.push({
        totalChainFeeUSD,
        totalBridgeFeeUSD,
      });
    }

    return feeTotalsPerTimeFrame;

  } catch (error) {
    console.error("Error fetching data:", error);
    return [{
      totalChainFeeUSD: 0,
      totalBridgeFeeUSD: 0,
    }];
  }
}

function getMostCommonDenom(feeTotals: { [denom: string]: number }) {
  let mostCommonDenom = null;
  let maxCount = 0;

  for (let denom in feeTotals) {
    if (!gravityDenomToStringMap.hasOwnProperty(denom) || !tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom])) {
      continue;
    }
    const humanReadableDenom = gravityDenomToStringMap[denom];
    const decimals = tokenDecimalsMap[humanReadableDenom];
    const formattedValue = feeTotals[denom] / Math.pow(10, decimals);
    if (formattedValue > maxCount) {
      mostCommonDenom = denom;
      maxCount = formattedValue;
    }
  }

  return mostCommonDenom;
}