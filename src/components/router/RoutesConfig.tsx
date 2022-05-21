import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../../pages/Layout';
import Cocktails from '../../pages/Cocktails';
import Ingredients from '../../pages/Ingredients';
import NoPage from '../../pages/NoPage';

const RoutesConfig: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/cocktails" />} />
          <Route path="cocktails" element={<Cocktails />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
