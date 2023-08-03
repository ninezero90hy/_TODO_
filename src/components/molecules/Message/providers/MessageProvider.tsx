import React, { useMemo, useState } from 'react';
import MessageStateContext, { MessageStateContextProps } from '../contexts/MessageStateContext';
import MessageDispatchContext from '../contexts/MessageDispatchContext';

interface ModalProviderProps {
  children: React.ReactNode;
}

const MessageProvider = ({ children }: ModalProviderProps) => {
  const [showedMessages, setShowedMessages] = useState<Array<MessageStateContextProps>>([]);

  return (
    <MessageStateContext.Provider value={showedMessages}>
      <MessageDispatchContext.Provider
        value={useMemo(
          () => ({
            show: (messageStateContextProps: MessageStateContextProps) => {
              setShowedMessages((state) => {
                return state.concat(messageStateContextProps);
              });
              setTimeout(() => {
                requestAnimationFrame(() => {
                  setShowedMessages((state) => {
                    return state.slice(1, state.length);
                  });
                });
              }, 3000);
            },
          }),
          [],
        )}>
        {children}
      </MessageDispatchContext.Provider>
    </MessageStateContext.Provider>
  );
};

export default MessageProvider;
