import axios from "axios";

import { gravityDenomToStringMap, ChainFee } from "../../types";

export async function getChainFees() {
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
