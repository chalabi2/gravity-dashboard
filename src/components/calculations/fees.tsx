import axios from "axios";

import { gravityDenomToStringMap, ChainFee, BridgeFee, Amount } from "../../types";

export async function getChainFeeTotals() {
  try {
    const response = await axios.get("https://info.gravitychain.io:9000/transactions/send_to_eth");
    const data = response.data;

    const feesByDenom: Record<string, number> = {};

    data.forEach((entry: { data: { chain_fee: ChainFee[]; }; }) => {
      if (entry.data.chain_fee.length > 0) {
        const chainFee = entry.data.chain_fee[0];
        const denom = chainFee.denom;
        const amount = parseInt(chainFee.amount, 10);

        const readableDenom = gravityDenomToStringMap[denom] || denom;
        if (feesByDenom[readableDenom]) {
          feesByDenom[readableDenom] += amount;
        } else {
          feesByDenom[readableDenom] = amount;
        }
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
    const response = await axios.get("https://info.gravitychain.io:9000/transactions/send_to_eth");
    const data = response.data;

    const feesByDenom: Record<string, number> = {};

    data.forEach((entry: { data: { bridge_fee: BridgeFee[]; }; }) => {
      if (entry.data.bridge_fee.length > 0) {
        const bridgeFee = entry.data.bridge_fee[0];
        const denom = bridgeFee.denom;
        const amount = parseInt(bridgeFee.amount, 10);

        const readableDenom = gravityDenomToStringMap[denom] || denom;
        if (feesByDenom[readableDenom]) {
          feesByDenom[readableDenom] += amount;
        } else {
          feesByDenom[readableDenom] = amount;
        }
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