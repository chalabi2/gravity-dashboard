import axios from "axios";
import { Token, gravityDenomToStringMap } from "../../types";

function formatTokenAmount(amount: string, denom: string): number {
    const totalDigits = amount.length;
    const decimals = totalDigits >= 18 ? 18 : 6;
    const amountFloat = parseFloat(amount);
    const formattedAmount = amountFloat / Math.pow(10, decimals);
    return formattedAmount;
}

export async function getIbcAssets() {
    const response = await axios.get("https://info.gravitychain.io:9000/transactions/ibc_transfer");
    const data = response.data;

    const inAssets = new Map();
    const outAssets = new Map();

    for (const entry of data) {
        const { sender, receiver, token } = entry.data;

        // Determine if the transaction is in or out based on the sender and receiver
        const isOut = sender.includes("gravity");
        const isIn = receiver.includes("gravity");

        if (isIn || isOut) {
            for (const asset of token as Token[]) {
                const { amount, denom } = asset;

                // Format the token amount
                const formattedAmount = formatTokenAmount(amount, denom);

                // If the denom exists in the gravityDenomToStringMap, use the mapped name, otherwise, use the original denom
                const mappedDenom = gravityDenomToStringMap[denom] || denom;

                // Select the appropriate map (inAssets or outAssets) based on the transaction type
                const targetMap = isIn ? inAssets : outAssets;

                // Update the total amount for the given mapped denom
                const currentAmount = targetMap.get(mappedDenom) || 0;
                targetMap.set(mappedDenom, currentAmount + formattedAmount);
            }
        }
    }

    return { inAssets, outAssets };
}
