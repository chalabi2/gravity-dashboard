import axios from "axios";
import { Token, gravityDenomToStringMap } from "../../types";

function formatTokenAmount(amount: string, decimals: number): number {
    const amountFloat = parseFloat(amount);
    const formattedAmount = amountFloat / Math.pow(10, decimals);
    return formattedAmount;
  }

  function getDecimals(denom: string): number {
    if (!denom) {
      return 6;
    }
  
    if (denom.startsWith('u')) {
      return 6;
    } else if (denom.startsWith('a')) {
      return 18;
    } else if (denom.startsWith('n')) {
      return 9;
    } else {
      return 6;
    }
  }

  const get_ibc_denom_human_readable = async (ibc_trace: string): Promise<string | undefined> => {        
    if (ibc_trace !== undefined && (!ibc_trace.startsWith('ibc/'))) {
        return undefined;
    }
    
    const hash = ibc_trace.replace('ibc/', '');
    const query = await axios.get(`https://gravity.api.chandrastation.com/ibc/apps/transfer/v1/denom_traces/${hash}`)
    
    const base_denom = query.data.denom_trace.base_denom;

    return base_denom;
}

export async function getIbcAssets(): Promise<{ inAssets: Map<string, number>; outAssets: Map<string, number>; }> {
    const response = await axios.get("https://info.gravitychain.io:9000/transactions/ibc_transfer");
    const data = response.data;
  
    const inAssets = new Map();
    const outAssets = new Map();
    const uniqueDenoms = new Set<string>();

    for (const entry of data) {
        const { token } = entry.data;
        for (const asset of token as Token[]) {
            const { denom } = asset;
            if (denom.startsWith('ibc/')) {
                uniqueDenoms.add(denom);
            }
        }
    }

    const denomTraceMap = new Map<string, string>();

    await Promise.all(Array.from(uniqueDenoms).map(async (denom) => {
        try {
            const baseDenom = await get_ibc_denom_human_readable(denom);
            if (baseDenom) {
                denomTraceMap.set(denom, baseDenom);
            } else {
                denomTraceMap.set(denom, denom);
            }
        } catch (error) {
            console.error(`Error fetching denom trace for ${denom}:`, error);
            denomTraceMap.set(denom, denom);
        }
    }));

    for (const entry of data) {
      const { sender, receiver, token } = entry.data;
  
      const isOut = sender.includes("gravity");
      const isIn = receiver.includes("gravity");

      if (isIn || isOut) {
        for (const asset of token as Token[]) {
          const { amount, denom } = asset;
  
          let mappedDenom = gravityDenomToStringMap[denom] || denomTraceMap.get(denom) || denom;
  
          const decimals = getDecimals(mappedDenom);
          const formattedAmount = formatTokenAmount(amount, decimals);
  
          const targetMap = isIn ? inAssets : outAssets;
          const currentAmount = targetMap.get(mappedDenom) || 0;
          targetMap.set(mappedDenom, currentAmount + formattedAmount);
        }
      }
    }
  
    return { inAssets, outAssets };
}