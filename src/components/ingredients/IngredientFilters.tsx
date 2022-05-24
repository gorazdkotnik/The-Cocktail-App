import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IIngredientListProps } from './IngredientList';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import TabPanel from '../ui/TabPanel';

import IngredientNameFilter from './filters/IngredientNameFilter';

const pages = new Map([['name', 0]]);

interface IIngredientFiltersProps {
  onFilterChange: (data: IIngredientListProps) => void;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const IngredientFilters: React.FC<IIngredientFiltersProps> = ({
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
      onFilterChange({ searchUrl: '/search.php?i=', value: name });
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
        default:
          break;
      }
    }
  }, [location, queryParams, onSearchNameHandler]);

  return (
    <Box sx={{ width: '100%' }}>
      <Divider textAlign="left" sx={{ mb: 2 }}>
        <Chip label="Filters" />
      </Divider>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={onTabChangeHandler}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Name"
            {...a11yProps(0)}
            component={Link}
            to={{ pathname: '/ingredients', search: '?filter=name' }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <IngredientNameFilter />
      </TabPanel>
    </Box>
  );
};

export default IngredientFilters;
