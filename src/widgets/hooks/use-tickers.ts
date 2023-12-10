import {useEffect, useState} from 'react';
import {getTickers} from '../../pages/stocks/model/get-tickers.ts';

export const useTickers = (setSelectedTicker: (val: string) => void): string[] => {
  const [tickers, setTickers] = useState<string[]>([]);

  useEffect(() => {
    getTickers()
      .then((tickers: string[]) => {
        setTickers(tickers);
        setSelectedTicker(tickers[0]);
      });
  }, []);

  return tickers;
};
