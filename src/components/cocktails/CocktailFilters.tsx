import React from 'react';

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

  const onTabChangeHandler = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const onSearchNameHandler = (name: string) => {
    onFilterChange({ searchUrl: '/search.php?s=', value: name });
  };

  const onSearchFirstLetterHandler = (letter: string) => {
    onFilterChange({ searchUrl: '/search.php?f=', value: letter });
  };

  const onSearchAlcoholicHandler = (alcoholic: string) => {
    onFilterChange({ searchUrl: '/filter.php?a=', value: alcoholic });
  };

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
          <Tab label="Name" {...a11yProps(0)} />
          <Tab label="First Letter" {...a11yProps(1)} />
          <Tab label="Alcoholic" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CocktailNameFilter onSearchName={onSearchNameHandler} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CocktailFirstLetterFilter
          onSearchFirstLetter={onSearchFirstLetterHandler}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CocktailAlcoholicFilter onSearchAlcoholic={onSearchAlcoholicHandler} />
      </TabPanel>
    </Box>
  );
};

export default CockTailFilters;
