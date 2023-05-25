import { Box, Grid } from '@mui/material';

import { ChildCard } from '@/pages/Child/components';

import { Child, ListResponse } from '@/types';

export interface ChildrenGridProps {
  list: ListResponse<Child>;
}

const ChildrenGrid = ({ list }: ChildrenGridProps) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {list.data.map((child) => (
          <Grid item lg={4} md={6} xs={12} key={child._id}>
            <ChildCard {...child} showGrowthHistory />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ChildrenGrid;
