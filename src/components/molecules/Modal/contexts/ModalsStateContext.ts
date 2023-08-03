import { createContext } from 'react';

export interface ModalsStateContextProps {
  Component: () => JSX.Element;
  props?: object;
}

const ModalsStateContext = createContext<Array<ModalsStateContextProps>>([]);

export default ModalsStateContext;
