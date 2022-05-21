import React from 'react';

import { ICocktailListProps } from '../components/cocktails/CocktailList';

import Container from '@mui/material/Container';

import CocktailFilters from '../components/cocktails/CocktailFilters';
import CocktailList from '../components/cocktails/CocktailList';

const Cocktails: React.FC = () => {
  const [searchUrl, setSearchUrl] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');

  const onFilterChangeHandler = (data: ICocktailListProps) => {
    setSearchUrl(data.searchUrl);
    setValue(data.value);
  };

  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <CocktailFilters onFilterChange={onFilterChangeHandler} />
      {searchUrl && value && (
        <CocktailList searchUrl={searchUrl} value={value} />
      )}
    </Container>
  );
};

export default Cocktails;
