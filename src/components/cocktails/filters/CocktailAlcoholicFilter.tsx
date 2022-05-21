import React from 'react';

import Grid from '@mui/material/Grid';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

interface ICocktailAlcoholicFilterProps {
  onSearchAlcoholic: (alcoholic: string) => void;
}

const CocktailAlcoholicFilter: React.FC<ICocktailAlcoholicFilterProps> = ({
  onSearchAlcoholic,
}) => {
  const [alcoholic, setAlcoholic] = React.useState<string>('Alcoholic');

  React.useEffect(() => {
    onSearchAlcoholic(alcoholic);
  }, [alcoholic, onSearchAlcoholic]);

  const onAlcoholicChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setAlcoholic(value as string);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ToggleButtonGroup
          color="secondary"
          value={alcoholic}
          exclusive
          onChange={onAlcoholicChangeHandler}
        >
          <ToggleButton value="Alcoholic">Alcoholic</ToggleButton>
          <ToggleButton value="Non_Alcoholic">Non Alcoholic</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default CocktailAlcoholicFilter;
