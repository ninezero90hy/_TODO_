import ModalsStateContext from './contexts/ModalsStateContext';
import { useContext } from 'react';

const ModalsArea = () => {
  const openedModals = useContext(ModalsStateContext);

  return (
    <>
      {openedModals.map(({ Component, props }, index) => {
        return (
          <Component
            key={index}
            {...props}
          />
        );
      })}
    </>
  );
};

export default ModalsArea;
