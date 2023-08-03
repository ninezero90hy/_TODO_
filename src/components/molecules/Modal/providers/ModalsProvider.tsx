import React, { useMemo, useState } from 'react';
import ModalsStateContext, { ModalsStateContextProps } from '../contexts/ModalsStateContext';
import ModalsDispatchContext from '../contexts/ModalsDispatchContext';

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalsProvider = ({ children }: ModalProviderProps) => {
  const [openedModals, setOpenedModals] = useState<Array<ModalsStateContextProps>>([]);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider
        value={useMemo(
          () => ({
            open: (Component: () => JSX.Element, props?: object) => {
              setOpenedModals((modals) => {
                return [...modals, { Component, props }];
              });
            },
            close: (Component: () => JSX.Element) => {
              setOpenedModals((modals) => {
                return modals.filter((modal) => {
                  return modal.Component !== Component;
                });
              });
            },
          }),
          [],
        )}>
        {children}
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
