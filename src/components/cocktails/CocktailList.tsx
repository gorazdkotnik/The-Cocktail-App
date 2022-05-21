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

import CocktailItem from './CocktailItem';

export interface ICocktailListProps {
  searchUrl: string;
  value: string;
}

const CocktailList: React.FC<ICocktailListProps> = ({ searchUrl, value }) => {
  const { data, error, loading } = useRequest(searchUrl + value);

  const [cocktails, setCocktails] = React.useState<any[]>([]);

  const [numberOfPages, setNumberOfPages] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);

  const onPageChangeHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  React.useEffect(() => {
    setCocktails(data?.drinks);

    if (!data?.drinks) {
      setPage(1);
    }

    if (data?.drinks) {
      const numberOfPages = Math.ceil(data.drinks.length / COCKTAILS_PER_PAGE);
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
    return <Alert severity="error">Error fetching cocktails.</Alert>;
  }

  return (
    <>
      {cocktails && cocktails.length > 0 && (
        <div>
          <Divider textAlign="left" sx={{ my: 2 }}>
            <Chip label="Cocktail List" />
          </Divider>
          <Grid container spacing={2}>
            {cocktails
              .slice((page - 1) * COCKTAILS_PER_PAGE, COCKTAILS_PER_PAGE * page)
              .map(cocktail => (
                <Grid item xs={12} sm={6} md={4} key={cocktail.idDrink}>
                  <CocktailItem cocktail={cocktail} />
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
      {(!cocktails || cocktails.length === 0) && !loading && (
        <Alert severity="info">Cannot find any cocktails.</Alert>
      )}
    </>
  );
};

export default CocktailList;
