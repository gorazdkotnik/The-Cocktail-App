import React from 'react';

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

interface ICocktailFirstLetterFilterProps {
  onSearchFirstLetter: (name: string) => void;
}

const CocktailFirstLetterFilter: React.FC<ICocktailFirstLetterFilterProps> = ({
  onSearchFirstLetter,
}) => {
  const [firstCocktailLetter, setFirstCocktailLetter] =
    React.useState<string>('');

  const onFirstCocktailLetterChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setFirstCocktailLetter(value as string);
  };

  const onSearchClickHandler = () => {
    if (firstCocktailLetter.trim() === '') {
      return;
    }

    onSearchFirstLetter(firstCocktailLetter);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          options={letters}
          onChange={onFirstCocktailLetterChangeHandler}
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