import { useContext } from 'react';
import MessageDispatchContext from '../contexts/MessageDispatchContext';
import { MessageTypes } from '../MessagesArea';

export default function useMessages() {
  const { show } = useContext(MessageDispatchContext);

  const showWarningMessage = (message: string) => {
    show({ type: MessageTypes.WARNING, message });
  };
  const showInfoMessage = (message: string) => {
    show({ type: MessageTypes.INFO, message });
  };
  const showSuccessMessage = (message: string) => {
    show({ type: MessageTypes.SUCCESS, message });
  };
  const showErrorMessage = (message: string) => {
    show({ type: MessageTypes.ERROR, message });
  };

  return {
    showWarningMessage,
    showInfoMessage,
    showSuccessMessage,
    showErrorMessage,
  };
}
