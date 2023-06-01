import axios from "axios";

import { gravityDenomToStringMap, tokenDecimalsMap } from "../../types";

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
    const response = await axios.get<TransactionResponse>('https://info.gravitychain.io:9000/transactions/send_to_eth/time');

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
    const allTimeBridgeFees = response.data.time_frames[3].bridge_fee_totals;
    const allTimeChainFees = response.data.time_frames[3].chain_fee_totals;

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
