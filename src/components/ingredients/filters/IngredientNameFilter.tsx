import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const IngredientNameFilter: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = React.useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const [ingredientName, setIngredientName] = React.useState<string>(
    query.get('value') || ''
  );

  const [invalidIngredientName, setInvalidIngredientName] =
    React.useState<boolean>(false);

  const onCocktailNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientName(event.target.value);
  };

  const onSearchClickHandler = () => {
    setInvalidIngredientName(false);

    if (ingredientName.trim() === '') {
      setInvalidIngredientName(true);
      return;
    }

    navigate('/ingredients?filter=name&value=' + ingredientName);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField
          error={invalidIngredientName}
          id="filled-basic"
          label="Search ingredient by name"
          variant="filled"
          onChange={onCocktailNameChangeHandler}
          value={ingredientName}
          helperText={
            invalidIngredientName ? 'Please provide a ingredient name.' : ''
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
          disabled={ingredientName === ''}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default IngredientNameFilter;
