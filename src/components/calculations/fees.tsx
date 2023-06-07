import axios from "axios";

import { gravityDenomToStringMap, ChainFee, BridgeFee, Amount } from "../../types";

export async function getChainFeeTotals() {
  try {
    const response = await axios.get("http://66.172.36.132:9000/transactions/send_to_eth");
    const entries = response.data;

    const feesByDenom: Record<string, number> = {};

    entries.forEach((entry: { transactions: { data: { chain_fee: ChainFee[] }; }[] }) => {
      const transactions = entry.transactions[0]?.data;
      if (transactions && transactions.chain_fee) {
        transactions.chain_fee.forEach((chainFee: ChainFee) => {
          const denom = chainFee.denom;
          const amount = parseInt(chainFee.amount, 10);

          const readableDenom = gravityDenomToStringMap[denom] || denom;
          if (feesByDenom[readableDenom]) {
            feesByDenom[readableDenom] += amount;
          } else {
            feesByDenom[readableDenom] = amount;
          }
        });
      }
    });

    const result = Object.keys(feesByDenom).map((denom) => ({
      denom,
      totalChainFees: feesByDenom[denom],
    }));

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getBridgeFeeTotals() {
  try {
    const response = await axios.get("http://66.172.36.132:9000/transactions/send_to_eth");
    const entries = response.data;

    const feesByDenom: Record<string, number> = {};

    entries.forEach((entry: { transactions: { data: { bridge_fee: BridgeFee[] }; }[] }) => {
      const transactions = entry.transactions[0]?.data;
      if (transactions && transactions.bridge_fee) {
        transactions.bridge_fee.forEach((bridgeFee: BridgeFee) => {
          const denom = bridgeFee.denom;
          const amount = parseInt(bridgeFee.amount, 10);

          const readableDenom = gravityDenomToStringMap[denom] || denom;
          if (feesByDenom[readableDenom]) {
            feesByDenom[readableDenom] += amount;
          } else {
            feesByDenom[readableDenom] = amount;
          }
        });
      }
    });

    const result = Object.keys(feesByDenom).map((denom) => ({
      denom,
      totalBridgeFees: feesByDenom[denom],
    }));

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getTokenAmountTotals() {
  try {
    const response = await axios.get("http://66.172.36.132:9000/transactions/send_to_eth");
    const entries = response.data;

    const tokensByDenom: Record<string, number> = {};

    entries.forEach((entry: { transactions: { data: { amount: Amount[] }; }[] }) => {
      const transactions = entry.transactions[0]?.data;
      if (transactions && transactions.amount) {
        transactions.amount.forEach((tokens: Amount) => {
          const denom = tokens.denom;
          const amount = parseInt(tokens.amount, 10);

          const readableDenom = gravityDenomToStringMap[denom] || denom;
          if (tokensByDenom[readableDenom]) {
            tokensByDenom[readableDenom] += amount;
          } else {
            tokensByDenom[readableDenom] = amount;
          }
        });
      }
    });

    const result = Object.keys(tokensByDenom).map((denom) => ({
      denom,
      totalAmounts: tokensByDenom[denom],
    }));

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}