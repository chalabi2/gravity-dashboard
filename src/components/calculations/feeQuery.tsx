import axios from "axios";

import {
  gravityDenomToStringMap,
  tokenDecimalsMap,
  BlockTransaction,
  Fee,
} from "../../types";
import { fetchTokenPriceData } from "./oracle";
import { getTxAmt } from "./totalTx";

function convertRawAmount(token: string, amount: number) {
  const decimals = tokenDecimalsMap[token];
  const convertedAmount = amount / Math.pow(10, decimals);
  return Number(convertedAmount.toFixed(2));
}

type TransactionResponse = {
  time_frames: {
    period: string;
    amount_totals: { [key: string]: number };
    bridge_fee_totals: { [key: string]: number };
    chain_fee_totals: { [key: string]: number };
  }[];
};

interface SendToEthTimeData {
  data: TransactionResponse;
}

function convertGravityDenom(denom: string) {
  return gravityDenomToStringMap[denom] || denom;
}

let sendToEthTimeData: SendToEthTimeData | null = null;

export async function fetchSendToEthTime() {
  if (sendToEthTimeData) return sendToEthTimeData;

  try {
    const response = await axios.get(
      "https://info.gravitychain.io:9000/transactions/send_to_eth/time"
    );
    sendToEthTimeData = response;
    return sendToEthTimeData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getFees() {
  try {
    const response = await fetchSendToEthTime();

    if (!response.data.time_frames || response.data.time_frames.length === 0) {
      console.error("No time frames in the response");
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
      oneDayBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(oneDayChainFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      oneDayChainFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(oneWeekBridgeFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      oneWeekBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(oneWeekChainFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      oneWeekChainFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(oneMonthBridgeFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      oneMonthBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(oneMonthChainFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      oneMonthChainFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(oneYearBridgeFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      oneYearBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(oneYearChainFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      oneYearChainFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(allTimeBridgeFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      allTimeBridgeFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
    }

    for (const [denom, amount] of Object.entries(allTimeChainFees)) {
      const humanReadableDenom = convertGravityDenom(denom);
      allTimeChainFeesFormatted[humanReadableDenom] = convertRawAmount(
        humanReadableDenom,
        amount
      );
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
      allTimeChainFees: allTimeChainFeesFormatted,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getAverageFees() {
  try {
    const response = await fetchSendToEthTime();
    const data = response.data;

    const averageFeesPerTimeFrame = [];

    let { daily, weekly, monthly, yearly, allTime } = await getTxAmt();

    const chainFeeAllTimeTx = allTime - 10693;

    const transactionCountsAuto = [daily, weekly, monthly, yearly, allTime];
    const chainFeeTransactionCounts = [
      daily,
      weekly,
      monthly,
      yearly,
      chainFeeAllTimeTx,
    ];

    for (let index = 0; index < data.time_frames.length; index++) {
      const time_frame = data.time_frames[index];

      const chainFeeTotals = time_frame?.chain_fee_totals || [];

      const bridgeFeeTotals = time_frame?.bridge_fee_totals || [];

      let sumOfAverageChainFees = 0;
      let sumOfAverageBridgeFees = 0;

      const denoms = new Set([
        ...Object.keys(chainFeeTotals).filter(
          (denom) =>
            gravityDenomToStringMap.hasOwnProperty(denom) &&
            tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom]) &&
            !(index === transactionCountsAuto.length - 1 && gravityDenomToStringMap[denom] === 'HUAHUA')
        ),
        ...Object.keys(bridgeFeeTotals).filter(
          (denom) =>
            gravityDenomToStringMap.hasOwnProperty(denom) &&
            tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom]) &&
            !(index === transactionCountsAuto.length - 1 && gravityDenomToStringMap[denom] === 'HUAHUA')
        ),
      ]);

      const denomArray = Array.from(denoms);
      const tokenPriceDataPromises = denomArray.map((denom) =>
        fetchTokenPriceData(gravityDenomToStringMap[denom]).catch(() => ({
          price: 0,
        }))
      );

      const tokenPriceDataArray = await Promise.all(tokenPriceDataPromises);

for (let i = 0; i < denomArray.length; i++) {
  try {
    const denom = denomArray[i];
    const humanReadableDenom = gravityDenomToStringMap[denom];
    let tokenPriceData = tokenPriceDataArray[i];
    let tokenPrice = tokenPriceData.price;

    if(tokenPrice === undefined) {
      tokenPrice = 0;
    }

    const decimals = tokenDecimalsMap[humanReadableDenom];

    if (decimals === undefined || tokenPrice === 0) {
      continue;
    }

    const totalChainFeesInUSD =
      (chainFeeTotals[denom] / Math.pow(10, decimals)) * tokenPrice;
    const totalBridgeFeesInUSD =
      (bridgeFeeTotals[denom] / Math.pow(10, decimals)) * tokenPrice;

    sumOfAverageChainFees += totalChainFeesInUSD;
    sumOfAverageBridgeFees += totalBridgeFeesInUSD;
  } catch (error) {}
}

      const transactionCountAuto = transactionCountsAuto[index] || 0;
      const chainFeeTransactionCount = chainFeeTransactionCounts[index] || 0;

      const averageChainFee = chainFeeTransactionCount
        ? (sumOfAverageChainFees / chainFeeTransactionCount).toFixed(2)
        : "0.00";
      const averageBridgeFee = transactionCountAuto
        ? (sumOfAverageBridgeFees / transactionCountAuto).toFixed(2)
        : "0.00";
      let mostCommonChainFeeDenom = getMostCommonDenom(chainFeeTotals);
      mostCommonChainFeeDenom =
        mostCommonChainFeeDenom !== null
          ? gravityDenomToStringMap[mostCommonChainFeeDenom]
          : "";

      let mostCommonBridgeFeeDenom = getMostCommonDenom(bridgeFeeTotals);
      mostCommonBridgeFeeDenom =
        mostCommonBridgeFeeDenom !== null
          ? gravityDenomToStringMap[mostCommonBridgeFeeDenom]
          : "";

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

interface MostValuableFee {
  maxChainFee: string;
  maxBridgeFee: string;
  secondMaxBridgeFee: string;
  maxChainFeeDenom: string;
  maxBridgeFeeDenom: string;
  secondMaxBridgeFeeDenom: string;
  txHashRecordBridge: string;
  secondTxHashRecordBridge: string;
  txHashRecordChain: string;
}

export async function getMostValuableFees(): Promise<MostValuableFee[]> {
  try {
    const response = await axios.get(
      "https://info.gravitychain.io:9000/transactions/send_to_eth",
      { headers: { "Cache-Control": "no-store" } }
    );
    const transactions = response.data.reverse();

    let { daily, weekly, monthly, yearly, allTime } = await getTxAmt();

    const transactionCountsAuto = [daily, weekly, monthly, yearly, allTime];
    const mostValuableFeesPerTimeFrame: MostValuableFee[] = [];

    for (let index = 0; index < transactionCountsAuto.length; index++) {
      const timeframeTransactionsCount = transactionCountsAuto[index];
      let maxChainFeeInUSD = 0;
      let maxBridgeFeeInUSD = 0;
      let maxChainFeeDenom = "";
      let maxBridgeFeeDenom = "";
      let txHashRecordBridge = "";
      let txHashRecordChain = "";
      let secondMaxBridgeFeeInUSD = 0;
      let secondMaxBridgeFeeDenom = "";
      let secondTxHashRecordBridge = "";

      const timeframeTransactions = transactions.slice(
        0,
        timeframeTransactionsCount
      );

      const chainFeePromises = timeframeTransactions.flatMap(
        (transaction: BlockTransaction) => {
          return transaction.transactions[0].data.chain_fee.map(
            async (fee: Fee) => {
              if (fee.denom) {
                const denom = fee.denom;
                const humanReadableDenom = gravityDenomToStringMap[denom];
                if (index === transactionCountsAuto.length - 1 && humanReadableDenom === 'HUAHUA') {
                  return;
                }
                try {
                  const tokenPriceData = await fetchTokenPriceData(
                    humanReadableDenom
                  );
                  const tokenPrice = tokenPriceData.price;
                  const decimals = tokenDecimalsMap[humanReadableDenom];
                  if (decimals !== undefined && !isNaN(tokenPrice)) {
                    const feeInUSD =
                      (parseInt(fee.amount) / Math.pow(10, decimals)) *
                      tokenPrice;
                    if (feeInUSD > maxChainFeeInUSD) {
                      maxChainFeeInUSD = feeInUSD;
                      maxChainFeeDenom = humanReadableDenom;
                      txHashRecordChain = transaction.transactions[0].tx_hash;
                    }
                  }
                } catch (error) {}
              }
            }
          );
        }
      );

     const bridgeFeePromises = timeframeTransactions.flatMap(
        (transaction: BlockTransaction) => {
          return transaction.transactions[0].data.bridge_fee.map(
            async (fee: Fee) => {
              if (fee.denom) {
                const denom = fee.denom;
                const humanReadableDenom = gravityDenomToStringMap[denom];
                if (index === transactionCountsAuto.length - 1 && humanReadableDenom === 'HUAHUA') {
                  return;
                }
                try {
                  const tokenPriceData = await fetchTokenPriceData(
                    humanReadableDenom
                  );
                  const tokenPrice = tokenPriceData.price;
                  const decimals = tokenDecimalsMap[humanReadableDenom];
                  if (decimals !== undefined && !isNaN(tokenPrice)) {
                    const feeInUSD =
                      (parseFloat(fee.amount) / Math.pow(10, decimals)) *
                      tokenPrice;

                    if (feeInUSD > secondMaxBridgeFeeInUSD && feeInUSD < maxBridgeFeeInUSD - Number(36000)) {
                      secondMaxBridgeFeeInUSD = feeInUSD;
                      secondMaxBridgeFeeDenom = humanReadableDenom;
                      secondTxHashRecordBridge = transaction.transactions[0].tx_hash;
                    } else if (feeInUSD > maxBridgeFeeInUSD) {
                      secondMaxBridgeFeeInUSD = maxBridgeFeeInUSD;
                      secondMaxBridgeFeeDenom = maxBridgeFeeDenom;
                      secondTxHashRecordBridge = txHashRecordBridge;

                      maxBridgeFeeInUSD = feeInUSD;
                      maxBridgeFeeDenom = humanReadableDenom;
                      txHashRecordBridge = transaction.transactions[0].tx_hash;
                    }
                  }
                } catch (error) {}
              }
            }
          );
        }
      );

      await Promise.all([...chainFeePromises, ...bridgeFeePromises]);

      mostValuableFeesPerTimeFrame.push({
        maxChainFee: maxChainFeeInUSD.toFixed(2),
        maxBridgeFee: maxBridgeFeeInUSD.toFixed(2),
        secondMaxBridgeFee: secondMaxBridgeFeeInUSD.toFixed(2),
        maxChainFeeDenom,
        maxBridgeFeeDenom,
        secondMaxBridgeFeeDenom,
        txHashRecordBridge,
        secondTxHashRecordBridge,
        txHashRecordChain
      });
    }
    return mostValuableFeesPerTimeFrame;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getCombinedFeeData() {
  try {
    const response = await fetchSendToEthTime();
    const data = response.data;

    const feeTotalsPerTimeFrame = [];

    for (let index = 0; index < data.time_frames.length; index++) {
      const time_frame = data.time_frames[index];

      const chainFeeTotals = time_frame?.chain_fee_totals || [];
      const bridgeFeeTotals = time_frame?.bridge_fee_totals || [];

      let totalChainFeeUSD = 0;
      let totalBridgeFeeUSD = 0;

      const denoms = new Set([
        ...Object.keys(chainFeeTotals).filter(
          (denom) =>
            gravityDenomToStringMap.hasOwnProperty(denom) &&
            tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom]) &&
            !(index === data.time_frames.length - 1 && gravityDenomToStringMap[denom] === 'HUAHUA')
        ),
        ...Object.keys(bridgeFeeTotals).filter(
          (denom) =>
            gravityDenomToStringMap.hasOwnProperty(denom) &&
            tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom]) &&
            !(index === data.time_frames.length - 1 && gravityDenomToStringMap[denom] === 'HUAHUA')
        ),
      ]);

      const promises = Array.from(denoms).map(async (denom) => {
        try {
          const humanReadableDenom = gravityDenomToStringMap[denom];
          const tokenPriceData = await fetchTokenPriceData(humanReadableDenom);
          const tokenPrice = tokenPriceData.price;
          const decimals = tokenDecimalsMap[humanReadableDenom];

          if (decimals === undefined || isNaN(tokenPrice)) {
            return;
          }

          totalChainFeeUSD +=
            (chainFeeTotals[denom] / Math.pow(10, decimals)) * tokenPrice;
          totalBridgeFeeUSD +=
            (bridgeFeeTotals[denom] / Math.pow(10, decimals)) * tokenPrice;
        } catch (error) {}
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
    return [
      {
        totalChainFeeUSD: 0,
        totalBridgeFeeUSD: 0,
      },
    ];
  }
}

function getMostCommonDenom(feeTotals: { [denom: string]: number }) {
  let mostCommonDenom = null;
  let maxCount = 0;

  for (let denom in feeTotals) {
    if (
      !gravityDenomToStringMap.hasOwnProperty(denom) ||
      !tokenDecimalsMap.hasOwnProperty(gravityDenomToStringMap[denom])
    ) {
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
