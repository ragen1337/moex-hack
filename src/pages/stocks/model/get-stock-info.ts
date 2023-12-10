import {TStockCoordinate} from '../stocks.types.ts';
import {GATEWAY_ADDRESS} from '../../../shared/constants.ts';

export type TStockInfoDto = {
  actual: TStockCoordinate[];
  predicted: TStockCoordinate[];
};

export const getStockInfo = (ticker: string): Promise<TStockInfoDto> => {
  return fetch(`${GATEWAY_ADDRESS}/stock_info/${ticker}`)
    .then((res) => res.json());
};
