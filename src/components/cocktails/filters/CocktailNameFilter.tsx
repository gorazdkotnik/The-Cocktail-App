import React from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const CocktailNameFilter: React.FC = () => {
  const navigate = useNavigate();

  const [cocktailName, setCocktailName] = React.useState<string>('');
  const [invalidCocktailName, setInvalidCocktailName] =
    React.useState<boolean>(false);

  const onCocktailNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCocktailName(event.target.value);
  };

  const onSearchClickHandler = () => {
    setInvalidCocktailName(false);

    if (cocktailName.trim() === '') {
      setInvalidCocktailName(true);
      return;
    }

    navigate('/cocktails?filter=name&value=' + cocktailName);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          error={invalidCocktailName}
          id="filled-basic"
          label="Search cocktail by name"
          variant="filled"
          onChange={onCocktailNameChangeHandler}
          helperText={
            invalidCocktailName ? 'Please provide a cocktail name.' : ''
          }
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<SearchIcon />}
          onClick={onSearchClickHandler}
          disabled={cocktailName === ''}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default CocktailNameFilter;
