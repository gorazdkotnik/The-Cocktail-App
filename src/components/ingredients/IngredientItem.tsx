import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

interface IIngredientItemProps {
  ingredient: any;
}

const IngredientItem: React.FC<IIngredientItemProps> = ({ ingredient }) => {
  return (
    <Card>
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
            {ingredient.strDescription.length > 50
              ? ingredient.strDescription.substring(0, 47) + '...'
              : ingredient.strDescription}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/ingredients/${ingredient.strIngredient}`}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default IngredientItem;
