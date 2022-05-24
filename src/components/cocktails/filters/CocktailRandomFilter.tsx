import React from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

const CocktailRandomFilter: React.FC = () => {
  const navigate = useNavigate();

  const onGetRandomHandler = () => {
    navigate(
      '/cocktails?filter=random&value=' +
        Math.random().toString(16).substr(2, 8)
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<DownloadIcon />}
          onClick={onGetRandomHandler}
        >
          Get Random Cocktail
        </Button>
      </Grid>
    </Grid>
  );
};

export default CocktailRandomFilter;
