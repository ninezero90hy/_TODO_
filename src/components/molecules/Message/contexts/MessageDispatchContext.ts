import { createContext } from 'react';
import { MessageStateContextProps } from './MessageStateContext';

interface MessageDispatchContextProps {
  show: (messageStateContextProps: MessageStateContextProps) => void;
}

const MessageDispatchContext = createContext<MessageDispatchContextProps>({
  show: () => {
    throw new Error('Implement open function');
  },
});

export default MessageDispatchContext;
