import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../../pages/Layout';
import Cocktails from '../../pages/Cocktails';
import CocktailDetails from '../../pages/CocktailDetails';
import Ingredients from '../../pages/Ingredients';
import IngredientDetails from '../../pages/IngredientDetails';
import NoPage from '../../pages/NoPage';

const RoutesConfig: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/cocktails?filter=name" />} />
          <Route path="cocktails" element={<Cocktails />} />
          <Route path="cocktails/:id" element={<CocktailDetails />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="ingredients/:id" element={<IngredientDetails />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
