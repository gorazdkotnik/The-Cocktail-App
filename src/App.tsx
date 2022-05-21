import React from 'react';

import { GlobalContextProvider } from './context/GlobalContext';

import CssBaseline from '@mui/material/CssBaseline';

import RoutesConfig from './components/router/RoutesConfig';

const App: React.FC = () => {
  return (
    <GlobalContextProvider>
      <CssBaseline />
      <RoutesConfig />
    </GlobalContextProvider>
  );
};

export default App;
