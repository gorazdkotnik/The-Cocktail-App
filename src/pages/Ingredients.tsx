import React from 'react';

import { IIngredientListProps } from '../components/ingredients/IngredientList';

import Container from '@mui/material/Container';

import IngredientFilters from '../components/ingredients/IngredientFilters';
import IngredientList from '../components/ingredients/IngredientList';

const Ingredients: React.FC = () => {
  const [searchUrl, setSearchUrl] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');

  const onFilterChangeHandler = (data: IIngredientListProps) => {
    setSearchUrl(data.searchUrl);
    setValue(data.value);
  };

  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <IngredientFilters onFilterChange={onFilterChangeHandler} />
      {searchUrl && value && (
        <IngredientList searchUrl={searchUrl} value={value} />
      )}
    </Container>
  );
};

export default Ingredients;
