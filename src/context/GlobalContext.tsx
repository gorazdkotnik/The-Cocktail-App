import React, { useContext, createContext } from 'react';

const Context = createContext({});
const { Provider } = Context;

type GlobalContextProps = React.PropsWithChildren<{}>;

const GlobalContextProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const value = {};

  return <Provider value={value}>{children}</Provider>;
};

const useGlobalContext = () => useContext(Context);

export { GlobalContextProvider, useGlobalContext };
