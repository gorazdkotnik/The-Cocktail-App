import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

interface ICocktailItemProps {
  cocktail: any;
}

const CocktailItem: React.FC<ICocktailItemProps> = ({ cocktail }) => {
  return (
    <Card>
      {cocktail.strDrinkThumb && (
        <CardMedia
          component="img"
          alt={cocktail.strDrink}
          height="140"
          image={cocktail.strDrinkThumb}
        />
      )}
      <CardContent>
        {cocktail.strDrink && (
          <Typography gutterBottom variant="h5" component="div">
            {cocktail.strDrink}
          </Typography>
        )}
        {cocktail.strAlcoholic && (
          <Stack direction="row" spacing={1} sx={{ py: 1 }}>
            <Chip
              label={cocktail.strAlcoholic}
              color={
                cocktail.strAlcoholic === 'Alcoholic' ? 'error' : 'primary'
              }
            />
            <Chip label={cocktail.strCategory} color="success" />
          </Stack>
        )}
        {cocktail.strTags && (
          <Stack direction="row" spacing={1} sx={{ py: 1 }}>
            {cocktail.strTags.split(',').map((tag: string) => (
              <Chip key={tag} label={tag} />
            ))}
          </Stack>
        )}
        {cocktail.strInstructions && (
          <Typography variant="body2" color="text.secondary">
            {cocktail.strInstructions.length > 50
              ? cocktail.strInstructions.substring(0, 47) + '...'
              : cocktail.strInstructions}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CocktailItem;
