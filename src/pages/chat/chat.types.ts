import {E_MESSAGE_TYPES} from './chat.constants.ts';

export type TMessageObject = {
  id: number;
  type: E_MESSAGE_TYPES;
  message: string;
}
