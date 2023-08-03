import { createContext } from 'react';

interface ModalsDispatchContextProps {
  open: (Component: () => JSX.Element, props?: object) => void;
  /**
   * TODO: Need to change to be able to close with unique id
   */
  close: (Component: () => JSX.Element) => void;
}

const ModalsDispatchContext = createContext<ModalsDispatchContextProps>({
  open: () => {
    throw new Error('Implement open function');
  },
  close: () => {
    throw new Error('Implement close function');
  },
});

export default ModalsDispatchContext;
