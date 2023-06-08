import { fetchSendToEthTime } from "./feeQuery";

import { gravityDenomToStringMap } from "../../types";

export async function getChainFeeTotals() {
  try {
    const response = await fetchSendToEthTime();
    const data = response.data;

    const feesByDenom: Record<string, number> = {};

    const chainFeeTotals = data.time_frames[4]?.chain_fee_totals || [];

    Object.keys(chainFeeTotals).forEach((denom: string) => {
      const amount = chainFeeTotals[denom];

      const readableDenom = gravityDenomToStringMap[denom] || denom;
      if (feesByDenom[readableDenom]) {
        feesByDenom[readableDenom] += amount;
      } else {
        feesByDenom[readableDenom] = amount;
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
    const response = await fetchSendToEthTime();
    const data = response.data;

    const feesByDenom: Record<string, number> = {};

    const bridgeFeeTotals = data.time_frames[4]?.bridge_fee_totals || [];

    Object.keys(bridgeFeeTotals).forEach((denom: string) => {
      const amount = bridgeFeeTotals[denom];

      const readableDenom = gravityDenomToStringMap[denom] || denom;
      if (feesByDenom[readableDenom]) {
        feesByDenom[readableDenom] += amount;
      } else {
        feesByDenom[readableDenom] = amount;
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
