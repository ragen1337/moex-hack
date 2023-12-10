import {GATEWAY_ADDRESS} from '../../../shared/constants.ts';

export type TMessageDto = {
  text: string;
};

export const sendMessage = (message: string): Promise<TMessageDto> => {
  return fetch(`${GATEWAY_ADDRESS}/message`, {
    body: JSON.stringify({text: message}),
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((res) => res.json());
};
