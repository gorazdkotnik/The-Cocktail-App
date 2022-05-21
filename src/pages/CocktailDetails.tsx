import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useRequest from '../hooks/useRequest';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CocktailDetails: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, loading, error } = useRequest(`/lookup.php?i=${id}`);

  const [cocktail, setCocktail] = React.useState<any>(null);

  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [measures, setMeasures] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (data && data.drinks) {
      setCocktail(data?.drinks[0]);
    }
  }, [data]);

  React.useEffect(() => {
    if (cocktail) {
      for (const key in cocktail) {
        if (key.includes('strIngredient')) {
          if (cocktail[key] && !ingredients.includes(cocktail[key])) {
            setIngredients(prevState => [...prevState, cocktail[key]]);
          }
        }

        if (key.includes('strMeasure')) {
          if (cocktail[key] && !measures.includes(cocktail[key])) {
            setMeasures(prevState => [...prevState, cocktail[key]]);
          }
        }
      }
    }
  }, [cocktail, ingredients, measures]);

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
    return <Alert severity="error">Error fetching cocktails.</Alert>;
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

      {!cocktail && !loading && (
        <Alert severity="info">Cannot find this cocktail.</Alert>
      )}

      {cocktail && (
        <Card>
          {/* Image */}
          {cocktail.strDrinkThumb && (
            <CardMedia
              component="img"
              alt={cocktail.strDrink}
              height="100%"
              image={cocktail.strDrinkThumb}
            />
          )}
          <CardContent>
            {/* Name */}
            {cocktail.strDrink && (
              <Typography gutterBottom variant="h4" component="div">
                {cocktail.strDrink}
              </Typography>
            )}
            {/* Chips #1 */}
            <Stack direction="row" spacing={1} sx={{ py: 2 }}>
              {cocktail.strAlcoholic && (
                <Chip
                  label={cocktail.strAlcoholic}
                  color={
                    cocktail.strAlcoholic === 'Alcoholic' ? 'error' : 'primary'
                  }
                />
              )}
              {cocktail.strCategory && (
                <Chip label={cocktail.strCategory} color="success" />
              )}
            </Stack>
            {/* Chips #2 */}
            <Stack direction="row" spacing={1} sx={{ py: 1 }}>
              {cocktail.strIBA && <Chip label={cocktail.strIBA} color="info" />}
              {cocktail.strGlass && (
                <Chip label={cocktail.strGlass} color="info" />
              )}
            </Stack>
            {/* Chips #3 */}
            {cocktail.strTags && (
              <Stack direction="row" spacing={1} sx={{ py: 2 }}>
                {cocktail.strTags.split(',').map((tag: string) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Stack>
            )}
            {/* Instructions */}
            {cocktail.strInstructions && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {cocktail.strInstructions}
              </Typography>
            )}

            {/* Ingredients && Measures */}
            <Box sx={{ width: '100%', bgcolor: 'background.paper', my: 3 }}>
              <Typography gutterBottom variant="h6" component="div">
                Ingredients
              </Typography>
              <List>
                {ingredients.map((ingredient: string, index: number) => (
                  <ListItem disableGutters key={index}>
                    <ListItemButton>
                      <ListItemText primary={ingredient} />
                      <ListItemText primary={measures[index]} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default CocktailDetails;
