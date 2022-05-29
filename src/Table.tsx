import { useEffect, useState } from 'react';
import { Currency, Response } from '../interfaces/api-response';
import { Header } from './Header';
import { LineChart } from './LineChart';

type Props = { data: Response };

export type Key =
  | 'marketCapUsd'
  | 'name'
  | 'priceUsd'
  | 'changePercent24Hr'
  | 'volumeUsd24Hr';

export interface SortOrder {
  key: Key;
  order: number;
}

export const Table = ({ data }: Props) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    key: 'marketCapUsd',
    order: +1,
  });

  return (
    <div>
      <Header sortOrder={sortOrder} setSortOrder={setSortOrder} />
      {data.sort(sortFunction(sortOrder)).map((currency, index) => (
        <div
          className={`flex ${getBorder(index, data.length)} `}
          key={currency.id}
        >
          <div className="w-[200px] h-[132px] flex items-center font-semibold">
            {currency.name}
            <div className="ml-1 text-gray-300 uppercase">
              {currency.symbol}
            </div>
          </div>
          <div className="w-[200px] h-[132px] flex items-center justify-end font-semibold">
            {(+currency.priceUsd).toFixed(2)}
          </div>
          <div
            className={`w-[200px] h-[132px] flex items-center justify-center font-semibold ${
              +currency.changePercent24Hr > 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            <div className="flex">
              {getArrow(+currency.changePercent24Hr)}
              {(+currency.changePercent24Hr).toFixed(2)}%
            </div>
          </div>
          <div className="w-[200px] h-[132px] flex items-center font-semibold">
            {parseBigNumber(currency.marketCapUsd)}
          </div>
          <div className="w-[200px] h-[132px] flex items-center font-semibold">
            {parseBigNumber(currency.volumeUsd24Hr)}
          </div>
          <div className="w-[250px] h-[132px] flex items-center">
            <LineChart data={currency.histo}></LineChart>
          </div>
        </div>
      ))}
    </div>
  );
};

const parseBigNumber = (mc: string) => {
  return `$${(+mc)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

const getArrow = (n: number) =>
  n < 0 ? (
    <div className="mr-1">&#9660;</div>
  ) : (
    <div className="mr-1">&#9650; </div>
  );

const getBorder = (index: number, length: number) => {
  if (index === 0) {
    return ``;
  } else if (index === length - 1) {
    return `border-y-2`;
  }
  return `border-t-2`;
};

const sortFunction = (sortOrder: SortOrder) => {
  const { key, order } = sortOrder;
  if (
    key === 'priceUsd' ||
    key === 'marketCapUsd' ||
    key === 'volumeUsd24Hr' ||
    key === 'changePercent24Hr'
  ) {
    return order > 0
      ? (a: Currency, b: Currency) => +b[key] - +a[key]
      : (a: Currency, b: Currency) => +a[key] - +b[key];
  }
  return order > 0
    ? (a: Currency, b: Currency) => a[key].localeCompare(b[key])
    : (a: Currency, b: Currency) => b[key].localeCompare(a[key]);
};
