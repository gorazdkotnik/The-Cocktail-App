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

const CocktailGlassFilter: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = React.useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const { data, loading, error } = useRequest('/list.php?g=list');

  const [glasses, setGlasses] = React.useState<string[]>([]);
  const [glass, setGlass] = React.useState<string>(
    query.get('value') || 'Highball glass'
  );

  React.useEffect(() => {
    if (data && data.drinks) {
      setGlasses(data.drinks.map((item: any) => item.strGlass));
    }
  }, [data]);

  const onGlassChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setGlass(value as string);
  };

  const onSearchClickHandler = () => {
    if (!glass || glass.trim() === '') {
      return;
    }

    navigate(`/cocktails?filter=glass&value=${glass}`);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {glasses.length > 0 && (
          <Autocomplete
            disablePortal
            options={glasses}
            onChange={onGlassChangeHandler}
            value={glass}
            renderInput={params => (
              <TextField {...params} label="Glass" variant="filled" />
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
          disabled={!glass}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default CocktailGlassFilter;
