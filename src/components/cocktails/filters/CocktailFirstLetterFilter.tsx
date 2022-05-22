import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const CocktailFirstLetterFilter: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = React.useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const [firstCocktailLetter, setFirstCocktailLetter] = React.useState<string>(
    query.get('value') || 'a'
  );

  const onFirstCocktailLetterChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setFirstCocktailLetter(value as string);
  };

  const onSearchClickHandler = () => {
    if (!firstCocktailLetter || firstCocktailLetter.trim() === '') {
      return;
    }

    navigate(`/cocktails?filter=firstLetter&value=${firstCocktailLetter}`);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          options={letters}
          onChange={onFirstCocktailLetterChangeHandler}
          value={firstCocktailLetter}
          renderInput={params => (
            <TextField {...params} label="First Letter" variant="filled" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<SearchIcon />}
          onClick={onSearchClickHandler}
          disabled={firstCocktailLetter === ''}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default CocktailFirstLetterFilter;
