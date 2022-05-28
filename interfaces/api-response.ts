export interface Currency {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
  histo: Histo[];
}

export interface Histo {
  date: string;
  priceUsd: string;
  time: number;
}

export type Response = Currency[];
