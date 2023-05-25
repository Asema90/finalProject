import { Grid } from '@mui/material';

import { ChildGrowthHistory, ListResponse } from '@/types';

import { ChildGrowthHistoryCard } from '.';

export interface ChildGrowthHistoryGridProps {
  list: ListResponse<ChildGrowthHistory>;
}

const ChildGrowthHistoryGrid = ({ list }: ChildGrowthHistoryGridProps) => {
  return (
    <Grid container spacing={3}>
      {list.data.map((child) => (
        <Grid item xs={12} key={child._id}>
          <ChildGrowthHistoryCard {...child} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ChildGrowthHistoryGrid;
