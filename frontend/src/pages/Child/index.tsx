import { Box, Grid, Stack } from '@mui/material';

import { HEADER_HEIGHT } from '@/utils/constants';
import { ChildGrowthHistory } from '@/pages/ChildGrowthHistory/components';
import theme from '@/theme';

import { Child } from './components';

const ChildPage = () => {
  return (
    <Stack spacing={2}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Box sx={{ position: 'sticky', top: `calc(${HEADER_HEIGHT}px + ${theme.spacing(3)})` }}>
            <Child />
          </Box>
        </Grid>

        <Grid item lg={8} md={6} xs={12}>
          <ChildGrowthHistory />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChildPage;
