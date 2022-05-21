import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const CocktailAlcoholicFilter: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = React.useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const [alcoholic, setAlcoholic] = React.useState<string>('Alcoholic');

  React.useEffect(() => {
    const alcoholicValue = query.get('value');

    if (alcoholicValue) {
      setAlcoholic(alcoholicValue);
      navigate(`/cocktails?filter=alcoholic&value=${alcoholicValue}`);
    }
  }, []);

  const onAlcoholicChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    if (value) {
      setAlcoholic(value as string);
      navigate(`/cocktails?filter=alcoholic&value=${value}`);
    }
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
