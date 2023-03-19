import axios from 'axios';

export const fetchGravityBridgeData = async () => {
  const coinId = 'graviton';
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );
  const data = response.data;

  function numberWithCommas(number: number | bigint) {
    return new Intl.NumberFormat('en-US').format(number);
  }

  return {
    price: data.market_data.current_price.usd,
    marketCap: numberWithCommas(data.market_data.market_cap.usd),
    tradingVolume: numberWithCommas(data.market_data.total_volume.usd),
    rank: data.market_data.market_cap_rank,
  };
};
