import axios from "axios";

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(2) + 'B';
  } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2) + 'M';
  } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
  } else {
      return num.toString();
  }
}

export async function getBridgeTvl() {
  try {
    const response = await axios.get("https://api.chandrastation.com/gravity/bridge_volume");
    const { vol, tvl } = response.data[0];

    return {
      vol: formatNumber(vol),
      tvl: formatNumber(tvl)
    };
  } catch (error) {
    //throw new Error(`Error getting bridge volume: ${error}`);
  }
}