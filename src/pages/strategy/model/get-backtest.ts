import {GATEWAY_ADDRESS} from '../../../shared/constants.ts';
import {TStockCoordinate} from '../../stocks/stocks.types.ts';

export type TBacktestDto = {
  revenue: number;
  actual: TStockCoordinate[];
  buyDecisions: TStockCoordinate[];
  sellDecisions: TStockCoordinate[];
}

export const getBacktest = (ticker: string, fromDate: number, tillDate: number, balance: number, strategy: string): Promise<TBacktestDto> => {
  return fetch(`${GATEWAY_ADDRESS}/backtest/${ticker}?date=${fromDate}&till_date=${tillDate}&balance=${balance}&strategy_type=${strategy}`)
    .then((res) => res.json());
};
