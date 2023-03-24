import axios from 'axios';

const blacklistedAssets = ['uaxl'];

export async function fetchAxios() {
  const response = await axios.get('https://api.axelarscan.io/cross-chain/tvl');

  const data = response.data;

  let tvl = 0;
  for (const asset of data) {
    if (blacklistedAssets.includes(asset.asset)) continue;
    tvl += asset.value;
  }
  return tvl;
}
