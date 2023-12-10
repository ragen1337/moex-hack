import {GATEWAY_ADDRESS} from '../../../shared/constants.ts';

export const getTickers = (): Promise<string[]> => {
  return fetch(`${GATEWAY_ADDRESS}/tickers`)
    .then((res) => res.json());
};
