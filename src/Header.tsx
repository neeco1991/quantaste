import { Key, SortOrder } from './Table';

type Props = { sortOrder: SortOrder; setSortOrder: Function };

export const Header = ({ sortOrder, setSortOrder }: Props) => {
  const getArrow = (name: Key) => {
    if (name === sortOrder.key) {
      return sortOrder.order > 0 ? (
        <div className="mr-1">&#9660;</div>
      ) : (
        <div className="mr-1">&#9650;</div>
      );
    }
    return;
  };

  const sort = (key: Key) => {
    if (sortOrder.key === key) {
      const newState = {
        key,
        order: sortOrder.order * -1,
      };
      setSortOrder(newState);
    } else {
      const newState = {
        key,
        order: +1,
      };
      setSortOrder(newState);
    }
  };

  return (
    <div className="flex border-y-2 mt-5">
      <div
        className="w-[50px] font-bold cursor-pointer h-[50px] flex items-center"
        onClick={() => {
          sort('rank');
        }}
      >
        #{getArrow('rank')}
      </div>
      <div
        className="w-[200px] font-bold cursor-pointer h-[50px] flex items-center"
        onClick={() => {
          sort('name');
        }}
      >
        Name
        {getArrow('name')}
      </div>
      <div
        className="w-[200px] font-bold cursor-pointer h-[50px] flex items-center justify-end"
        onClick={() => {
          sort('priceUsd');
        }}
      >
        Price
        {getArrow('priceUsd')}
      </div>
      <div
        className="w-[200px] font-bold cursor-pointer h-[50px] flex items-center justify-center"
        onClick={() => {
          sort('changePercent24Hr');
        }}
      >
        24h%
        {getArrow('changePercent24Hr')}
      </div>
      <div
        className="w-[200px] font-bold cursor-pointer h-[50px] flex items-center"
        onClick={() => {
          sort('marketCapUsd');
        }}
      >
        Market Cap
        {getArrow('marketCapUsd')}
      </div>
      <div
        className="w-[200px] font-bold cursor-pointer h-[50px] flex items-center"
        onClick={() => {
          sort('volumeUsd24Hr');
        }}
      >
        Volume (24h)
        {getArrow('volumeUsd24Hr')}
      </div>
      <div className="w-[250px] font-bold h-[50px] flex items-center justify-center">
        Last 7 days
      </div>
    </div>
  );
};
