import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ICocktailListProps } from './CocktailList';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import TabPanel from '../ui/TabPanel';

import CocktailNameFilter from './filters/CocktailNameFilter';
import CocktailFirstLetterFilter from './filters/CocktailFirstLetterFilter';
import CocktailAlcoholicFilter from './filters/CocktailAlcoholicFilter';

const pages = new Map([
  ['name', 0],
  ['firstLetter', 1],
  ['alcoholic', 2],
]);

interface ICocktailFiltersProps {
  onFilterChange: (data: ICocktailListProps) => void;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CockTailFilters: React.FC<ICocktailFiltersProps> = ({
  onFilterChange,
}) => {
  const [value, setValue] = React.useState(0);

  const location = useLocation();
  const queryParams = React.useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );

  const onTabChangeHandler = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const onSearchNameHandler = React.useCallback(
    (name: string) => {
      onFilterChange({ searchUrl: '/search.php?s=', value: name });
    },
    [onFilterChange]
  );

  const onSearchFirstLetterHandler = React.useCallback(
    (letter: string) => {
      onFilterChange({ searchUrl: '/search.php?f=', value: letter });
    },
    [onFilterChange]
  );

  const onSearchAlcoholicHandler = React.useCallback(
    (alcoholic: string) => {
      onFilterChange({ searchUrl: '/filter.php?a=', value: alcoholic });
    },
    [onFilterChange]
  );

  React.useEffect(() => {
    const page = pages.get(queryParams.get('filter') || 'name');
    setValue(page || 0);

    const value = queryParams.get('value');
    if (value) {
      switch (page) {
        case 0:
          onSearchNameHandler(value);
          break;
        case 1:
          onSearchFirstLetterHandler(value);
          break;
        case 2:
          onSearchAlcoholicHandler(value);
          break;
        default:
          break;
      }
    }
  }, [
    location,
    queryParams,
    onSearchNameHandler,
    onSearchFirstLetterHandler,
    onSearchAlcoholicHandler,
  ]);

  return (
    <Box sx={{ width: '100%' }}>
      <Divider textAlign="left" sx={{ mb: 2 }}>
        <Chip label="Filters" />
      </Divider>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={onTabChangeHandler}
          aria-label="basic tabs example"
        >
          <Tab
            label="Name"
            {...a11yProps(0)}
            component={Link}
            to={{ pathname: '/cocktails', search: '?filter=name' }}
          />
          <Tab
            label="First Letter"
            {...a11yProps(1)}
            component={Link}
            to={{ pathname: '/cocktails', search: '?filter=firstLetter' }}
          />
          <Tab
            label="Alcoholic"
            {...a11yProps(2)}
            component={Link}
            to={{
              pathname: '/cocktails',
              search: '?filter=alcoholic&value=Alcoholic',
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CocktailNameFilter />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CocktailFirstLetterFilter />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CocktailAlcoholicFilter />
      </TabPanel>
    </Box>
  );
};

export default CockTailFilters;
