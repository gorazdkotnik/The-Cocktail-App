import React from 'react';

import useRequest from '../../hooks/useRequest';

import { COCKTAILS_PER_PAGE } from '../../utils/consts';

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

import IngredientItem from './IngredientItem';

export interface IIngredientListProps {
  searchUrl: string;
  value: string;
}

const IngredientList: React.FC<IIngredientListProps> = ({
  searchUrl,
  value,
}) => {
  const { data, error, loading } = useRequest(searchUrl + value);

  const [ingredients, setIngredients] = React.useState<any[]>([]);

  const [numberOfPages, setNumberOfPages] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);

  const onPageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  React.useEffect(() => {
    setIngredients(data?.ingredients);

    if (!data?.ingredients) {
      setPage(1);
    }

    if (data?.ingredients) {
      const numberOfPages = Math.ceil(
        data.ingredients.length / COCKTAILS_PER_PAGE
      );
      setNumberOfPages(numberOfPages);
      setPage(1);
    }
  }, [data]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error fetching ingredients.</Alert>;
  }

  return (
    <>
      {ingredients && ingredients.length > 0 && (
        <div>
          <Divider textAlign="left" sx={{ my: 2 }}>
            <Chip label="Ingredient List" />
          </Divider>
          <Grid container spacing={2}>
            {ingredients
              .slice((page - 1) * COCKTAILS_PER_PAGE, COCKTAILS_PER_PAGE * page)
              .map(ingredient => (
                <Grid item xs={12} sm={6} md={4} key={ingredient.idIngredient}>
                  <IngredientItem ingredient={ingredient} />
                </Grid>
              ))}
          </Grid>
          <Divider sx={{ my: 2 }}></Divider>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={numberOfPages}
              color="secondary"
              onChange={onPageChangeHandler}
              page={page}
            />
          </Box>
        </div>
      )}
      {(!ingredients || ingredients.length === 0) && !loading && (
        <Alert severity="info">Cannot find any ingredients.</Alert>
      )}
    </>
  );
};

export default IngredientList;
