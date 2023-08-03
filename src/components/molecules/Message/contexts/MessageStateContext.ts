import { createContext } from 'react';
import { MessageTypes } from '../MessagesArea';

export interface MessageStateContextProps {
  type: MessageTypes;
  message: string;
}

const MessageStateContext = createContext<Array<MessageStateContextProps>>([]);

export default MessageStateContext;
