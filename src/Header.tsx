import { useState } from 'react';
import { Key } from './Table';

type Props = { sort: Function };

export const Header = ({ sort }: Props) => {
  const [selectedKey, setSelectedKey] = useState<Key>('marketCapUsd');

  const getArrow = (name: Key) => {
    if (name === selectedKey) {
      return <div className="mr-1">&#9660;</div>;
    }
    return;
  };

  return (
    <div className="flex border-y-2 mt-5">
      <div
        className="w-[200px] font-semibold cursor-pointer h-[50px] flex items-center"
        onClick={() => {
          setSelectedKey('name');
          sort('name');
        }}
      >
        Name
        {getArrow('name')}
      </div>
      <div
        className="w-[200px] font-semibold cursor-pointer h-[50px] flex items-center justify-end"
        onClick={() => {
          setSelectedKey('priceUsd');
          sort('priceUsd');
        }}
      >
        Price
        {getArrow('priceUsd')}
      </div>
      <div
        className="w-[200px] font-semibold cursor-pointer h-[50px] flex items-center justify-center"
        onClick={() => {
          setSelectedKey('changePercent24Hr');
          sort('changePercent24Hr');
        }}
      >
        24h%
        {getArrow('changePercent24Hr')}
      </div>
      <div
        className="w-[200px] font-semibold cursor-pointer h-[50px] flex items-center"
        onClick={() => {
          setSelectedKey('marketCapUsd');
          sort('marketCapUsd');
        }}
      >
        Market Cap
        {getArrow('marketCapUsd')}
      </div>
      <div
        className="w-[200px] font-semibold cursor-pointer h-[50px] flex items-center"
        onClick={() => {
          setSelectedKey('volumeUsd24Hr');
          sort('volumeUsd24Hr');
        }}
      >
        Volume (24h)
        {getArrow('volumeUsd24Hr')}
      </div>
      <div className="w-[250px] font-semibold h-[50px] flex items-center justify-center">
        Last 7 days
      </div>
    </div>
  );
};
