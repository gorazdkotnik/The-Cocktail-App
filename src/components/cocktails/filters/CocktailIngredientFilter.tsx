import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useRequest from '../../../hooks/useRequest';

import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const CocktailIngredientFilter: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = React.useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const { data, loading, error } = useRequest('/list.php?i=list');

  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [ingredient, setIngredient] = React.useState<string>(
    query.get('value') || 'Light rum'
  );

  React.useEffect(() => {
    if (data && data.drinks) {
      setIngredients(data.drinks.map((item: any) => item.strIngredient1));
    }
  }, [data]);

  const onIngredientChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setIngredient(value as string);
  };

  const onSearchClickHandler = () => {
    if (!ingredient || ingredient.trim() === '') {
      return;
    }

    navigate(`/cocktails?filter=ingredient&value=${ingredient}`);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {ingredients.length > 0 && (
          <Autocomplete
            disablePortal
            options={ingredients}
            onChange={onIngredientChangeHandler}
            value={ingredient}
            renderInput={params => (
              <TextField {...params} label="Ingredient" variant="filled" />
            )}
          />
        )}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, mb: 3 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ my: 3 }}>
            Error fetching ingredients.
          </Alert>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<SearchIcon />}
          onClick={onSearchClickHandler}
          disabled={!ingredient}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default CocktailIngredientFilter;
