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

const CocktailCategoryFilter: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = React.useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const { data, loading, error } = useRequest('/list.php?c=list');

  const [categories, setCategories] = React.useState<string[]>([]);
  const [category, setCategory] = React.useState<string>(
    query.get('value') || 'Ordinary Drink'
  );

  React.useEffect(() => {
    if (data && data.drinks) {
      setCategories(data.drinks.map((item: any) => item.strCategory));
    }
  }, [data]);

  const onCategoryChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setCategory(value as string);
  };

  const onSearchClickHandler = () => {
    if (!category || category.trim() === '') {
      return;
    }

    navigate(`/cocktails?filter=category&value=${category}`);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {categories.length > 0 && (
          <Autocomplete
            disablePortal
            options={categories}
            onChange={onCategoryChangeHandler}
            value={category}
            renderInput={params => (
              <TextField {...params} label="Category" variant="filled" />
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
            Error fetching categories.
          </Alert>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<SearchIcon />}
          onClick={onSearchClickHandler}
          disabled={!category}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default CocktailCategoryFilter;
