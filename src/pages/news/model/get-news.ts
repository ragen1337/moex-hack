import {GATEWAY_ADDRESS} from '../../../shared/constants.ts';

export type TNewsItemDto = {
  "link": string;
  "title": string;
  "snippet": string;
  "date": string;
  "source": string;
}

export const getNews = (ticker: string): Promise<TNewsItemDto[]> => {
  return fetch(`${GATEWAY_ADDRESS}/news/${ticker}`)
    .then((res) => res.json());
};
