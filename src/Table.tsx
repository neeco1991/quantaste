import { Response } from '../interfaces/api-response';
import { Header } from './Header';

type Props = { data: Response };

export const Table = ({ data }: Props) => {
  return (
    <div className="">
      <Header />
      {data.map((currency, index) => (
        <div
          className={`flex ${getBorder(index, data.length)}`}
          key={currency.id}
        >
          <div className="w-[150px] h-[50px] flex items-center font-semibold">
            {currency.name}
          </div>
          <div className="w-[150px] h-[50px] flex items-center">
            {(+currency.priceUsd).toFixed(2)}
          </div>
          <div
            className={`w-[150px] h-[50px] flex items-center ${
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
          <div className="w-[150px] h-[50px] flex items-center">
            {parseBigNumber(currency.marketCapUsd)}
          </div>
          <div className="w-[150px] h-[50px] flex items-center">
            {parseBigNumber(currency.volumeUsd24Hr)}
          </div>
          <div className="w-[150px] h-[50px] flex items-center">
            Last 7 days
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
