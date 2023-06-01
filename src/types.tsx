export type GravityBridgeData = {
    price: number;
    marketCap: string;
    tradingVolume: string;
    rank: number;
  };
  

export type BatchFees = {
    token: string,
    total_fees: number,
    tx_count: number
}

export type Attestation = {
    height: number,
    observed: boolean,
    votes: number
}

export type GravityParams = {
    bridge_ethereum_address: string,
    average_block_time: number,
    avearge_ethereum_block_time: number,
    target_batch_timeout: number,
    bridge_active: boolean,
    ethereum_blacklist: Array<string>,
    gravity_id: string,
    bridge_chain_id: number,
    signed_valsets_window: number,
    signed_batches_window: number,
    signed_logic_calls_window: number,
    unbond_slashing_valsets_window: number,
    valset_reward: Coin | null
}

export type Coin = {
    denom: string,
    amount: number,
}

export type Erc20Token = {
    amount: number,
    contract: string
}

export type TransactionBatch = {
    nonce: number,
    batch_timeout: number,
    transactions: Array<BatchTransaction>,
    total_fee: Erc20Token
    token_contract: string
}

export type BatchTransaction = {
    id: number,
    sender: string,
    destination: string,
    erc20_token: Erc20Token,
    erc20_fee: Erc20Token
}

export type GravityInfo = {
    pending_tx: Array<BatchFees>,
    pending_batches: Array<TransactionBatch>
    attestations: Array<Attestation>,
    params: GravityParams
}

export type ChainTotalSupplyNumbers = {
    community_pool: number,
    total_supply: number,
    total_liquid_supply: number,
    total_liquid_balances: number,
    total_unclaimed_rewards: number,
    total_nonvesting_staked: number,
    total_vesting: number,
    total_vesting_staked: number,
    total_vested: number,
}

export type DepositWithMetadata = {
    erc20: string,
    sender: string,
    destination: string,
    amount: number,
    event_nonce: number,
    block_height: number
    confirmed: boolean,
    blocks_until_confirmed: number,
    seconds_until_confirmed: number,
}

export type TransactionBatchExecutedEvent = {
    batch_nonce: number,
    block_height: number,
    erc20: string,
    event_nonce: number,
}

export type ValsetUpdatedEvent = {
    valset_nonce: number,
    event_nonce: number,
    block_height: number,
    reward_amount: number,
    reward_token: string | null,
    members: Array<ValsetMember>

}

export type ValsetMember = {
    power: number,
    eth_address: string
}

export type Erc20DeployedEvent = {
    cosmos_denom: string,
    erc20_address: string,
    name: string,
    symbol: string,
    decimals: number,
    event_nonce: number,
    block_height: number,
}

export type LogicCallExecutedEvent = {
    invalidation_id: Array<number>,
    invalidation_nonce: number,
    return_data: Array<number>,
    event_nonce: number,
    block_height: number,
}

export type EthInfo = {
    deposit_events: Array<DepositWithMetadata>,
    batch_events: Array<TransactionBatchExecutedEvent>,
    valset_updates: Array<ValsetUpdatedEvent>,
    erc20_deploys: Array<Erc20DeployedEvent>,
    logic_calls: Array<LogicCallExecutedEvent>,
    daily_volume: Number
}

export type Erc20Metadata = {
    address: string,
    decimals: number,
    symbol: string,
    exchange_rate: number | null
}

export type VolumeInfo = {
    daily_volume: number,
    daily_inflow: number,
    daily_outflow: number,
    weekly_volume: number,
    weekly_inflow: number,
    weekly_outflow: number,
    monthly_volume: number,
    monthly_inflow: number,
    monthly_outflow: number,
}

export type ChainFee = {
    amount: string,
    denom: string,
}

export type Token = {
    amount: string,
    denom: string,
}

export type BridgeFee = {
    amount: string,
    denom: string,
}

export type AmountBridged = {
    amount: number,
    denom: string,
}

export type gravityDenomToString = {
    [key: string]: string;
  };
  
  export const gravityDenomToStringMap: gravityDenomToString = {
    gravity0x6B175474E89094C44Da98b954EedeAC495271d0F: 'DAI',
    gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48: 'USDC',
    gravity0xdAC17F958D2ee523a2206206994597C13D831ec7: 'USDT',
    gravity0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599: 'WBTC',
    gravity0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2: 'WETH',
    gravity0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0: 'wstETH',
    gravity0xEa5A82B35244d9e5E48781F00b11B14E627D2951: 'ATOM-ETH',
    gravity0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9: 'WLUNC',
    gravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006: 'pSTAKE',
    gravity0x45804880De22913dAFE09f4980848ECE6EcbAf78: 'PAXG',
    gravity0xc0a4Df35568F116C370E6a6A6022Ceb908eedDaC: 'UMEE',
    gravity0xc0a4df35568f116c370e6a6a6022ceb908eeddac: 'UMEE_Duplicate',
    gravity0x44017598f2AF1bD733F9D87b5017b4E7c1B28DDE: 'stkATOM',
    gravity0x817bbDbC3e8A1204f3691d14bB44992841e3dB35: 'CUDOS',
    gravity0x467719aD09025FcC6cF6F8311755809d45a5E5f3: 'AXL',
    gravity0xea5a82b35244d9e5e48781f00b11b14e627d2951: 'ATOM-ETH_Duplicate',
    gravity0x77E06c9eCCf2E797fd462A92B6D7642EF85b0A44: 'WTAO',
    gravity0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE: 'SHIB',
    gravity0x35a532d376FFd9a705d0Bb319532837337A398E7: 'WDOGE',
    gravity0x93581991f68DBaE1eA105233b67f7FA0D6BDeE7b: 'WEVMOS',
    gravity0x514910771AF9Ca656af840dff83E8264EcF986CA: 'LINK',
    gravity0xa670d7237398238DE01267472C6f13e5B8010FD1: 'SOMM',
    gravity0xd3E4Ba569045546D09CF021ECC5dFe42b1d7f6E4: 'MNW',
    gravity0xd23Ed8cA350CE2631F7EcDC5E6bf80D0A1DeBB7B: 'PLQ',
    gravity0x07baC35846e5eD502aA91AdF6A9e7aA210F2DcbE: 'EROWAN',
    gravity0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b: 'CRO',
    gravity0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30: 'INJ',
    gravity0x4c11249814f11b9346808179Cf06e71ac328c1b5: 'ORAI',
    gravity0x4Fabb145d64652a948d72533023f6E7A623C7C53: 'BUSD',
    gravity0x147faF8De9d8D8DAAE129B187F0D02D819126750: 'GEO',
    gravity0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84: 'stETH',
    ugravity0xfB5c6815cA3AC72Ce9F5006869AE67f18bF77006: 'pSTAKE_Duplicate',
    gravity0xD8912C10681D8B21Fd3742244f44658dBA12264E: 'PLU',
    gravity0x525A8F6F3Ba4752868cde25164382BfbaE3990e1: 'NYM-ETH',
    gravity0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2: 'WETH_Duplicate',
    GRAVITY0XC02AAA39B223FE8D0A0E5C4F27EAD9083C756CC2: 'WETH_Broken',
    GRAVITY0XEA5A82B35244D9E5E48781F00B11B14E627D2951: 'ATOM-ETH_Broken',
    'ibc/406662DF40CFFCE3BBB80B2A2A7D476830C166981B14E18D8DD7446BB529377D': 'ISLM',
    'ibc/D03A8AA9A3226930D6763BD9578A1CBD8B2A6536FDEDCE33158591F3F7A39359': 'UND',
    'ibc/D956638E52570976F762354757863F60F2AFE4879E849CB1C77B163F0BF11C64': 'NYM_Duplicate',
    'ibc/29A7122D024B5B8FA8A2EFBB4FA47272C25C8926AA005A96807127208082DAB3': 'CMDX',
    'ibc/6BEE6DBC35E5CCB3C8ADA943CF446735E6A3D48B174FEE027FAB3410EDE6319C': 'KUJI',
    'ibc/7F04F5D641285808E1C6A01D266C3D9BE1C23473BF3D01AC31E621CFF72DBF24': 'LUNA',
    'ibc/00F2B62EB069321A454B708876476AFCD9C23C8C9C4A5A206DDF1CD96B645057': 'MNTL',
    'ibc/AD355DD10DF3C25CD42B5812F34077A1235DF343ED49A633B4E76AE98F3B78BC': 'USK',
    'ibc/50896BE248180B0341B4A679CF49249ECF70032AF1307BFAF0233D35F0D25665': 'USD',
    'ibc/2782B87D755389B565D59F15E202E6E3B8B3E1408034D2FAA4E02A0CA10911B2': 'PLANQ',
    'ibc/2E5D0AC026AC1AFA65A23023BA4F24BB8DDF94F118EDC0BAD6F625BFC557CDED': 'ATOM',
    'ibc/4F393C3FCA4190C0A6756CE7F6D897D5D1BE57D6CCB80D0BC87393566A7B6602': 'STARS',
    'ibc/5012B1C96F286E8A6604A87037CE51241C6F1CA195B71D1E261FCACB69FB6BC2': 'CHEQ',
    'ibc/048BE20AE2E6BFD4142C547E04F17E5F94363003A12B7B6C084E08101BFCF7D1': 'HUAHUA',
    'ibc/0C273962C274B2C05B22D9474BFE5B84D6A6FCAD198CB9B0ACD35EA521A36606': 'NYM',
    'ibc/6B207CDA2448604B83A0674AADD830C490C1AAB7D568135E52589E96A00B6EEF': 'EVMOS',
    'ibc/64BBBEB97DA04B6CF7A29A5454E43E101B29F506C117E800E128E0B32BA3FE3D': 'CANTO',
    'ibc/D157AD8A50DAB0FC4EB95BBE1D9407A590FA2CDEE04C90A76C005089BF76E519': 'FUND'
  };

  export const tokenDecimalsMap: { [key: string]: number } = {
    DAI: 18,
    USDT: 6,
    USDC: 6,
    WBTC: 8,
    WETH: 18,
    wstETH: 18,
    ATOM: 6,
    UMEE: 6,
    stkATOM: 6,
    AXL: 6,
    SOMM: 6,
    ISLM: 6,
    UND: 6,
    NYM_Duplicate: 6,
    CMDX: 6,
    KUJI: 6,
    LUNA: 6,
    MNTL: 6,
    USK: 6,
    USD: 6,
    PLANQ: 6,
    STARS: 6,
    CHEQ: 9,
    HUAHUA: 6,
    NYM: 6,
    FUND: 6

  };

  export interface ChainFeeData {
    denom: string;
    totalChainFees: number;
  }

  export interface BridgeFeeData {
    denom: string;
    totalBridgeFees: number;
  }

  export interface Amount {
    denom: string;
    amount: string;
  }

  export interface DuneData {
    tvl: string;
    vol: string;
  }