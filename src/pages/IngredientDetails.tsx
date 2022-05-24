import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useRequest from '../hooks/useRequest';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const IngredientDetails: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, loading, error } = useRequest(`/lookup.php?iid=${id}`);

  const [ingredient, setIngredient] = React.useState<any>(null);

  React.useEffect(() => {
    if (data && data.ingredients) {
      setIngredient(data?.ingredients[0]);
    }
  }, [data]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '75vh',
        }}
      >
        <CircularProgress size={75} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error fetching ingredient.</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Fab
        color="secondary"
        aria-label="add"
        sx={{ mb: 3 }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </Fab>

      {!ingredient && !loading && (
        <Alert severity="info">Cannot find this ingredient.</Alert>
      )}

      {ingredient && (
        <Card sx={{ maxWidth: '650px', margin: '0 auto' }}>
          <CardContent>
            {ingredient.strIngredient && (
              <Typography gutterBottom variant="h5" component="div">
                {ingredient.strIngredient}
              </Typography>
            )}
            {ingredient.strAlcohol && (
              <Stack direction="row" spacing={1} sx={{ py: 1 }}>
                <Chip
                  label={'Alcoholic: ' + ingredient.strAlcohol}
                  color={ingredient.strAlcohol === 'Yes' ? 'error' : 'primary'}
                />
                <Chip label={ingredient.strType} color="success" />
              </Stack>
            )}
            {ingredient.strDescription && (
              <Typography variant="body2" color="text.secondary">
                {ingredient.strDescription}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default IngredientDetails;
