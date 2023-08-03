import { useContext } from 'react';
import ModalsDispatchContext from '../contexts/ModalsDispatchContext';

export default function useModals() {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = (Component: () => JSX.Element, props?: object) => {
    open(Component, props);
  };

  const closeModal = (Component: () => JSX.Element) => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
  };
}
