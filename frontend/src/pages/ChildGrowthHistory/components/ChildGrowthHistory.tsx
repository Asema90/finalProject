import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import { childGrowthHistoryApi } from '@/services';
import { Empty, Error } from '@/components';

import { ChildGrowthHistoryGrid, ChildGrowthHistorySkeleton } from '.';

const { useGetChildGrowthHistoriesQuery } = childGrowthHistoryApi;

const ChildGrowthHistory = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: childGrowthHistories,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetChildGrowthHistoriesQuery({ params: { childId: id } });

  return (
    <>
      {isLoading || isFetching ? (
        <Box>
          <Grid container spacing={3}>
            {[1, 2, 3].map((key) => (
              <Grid item xs={12} key={key}>
                <ChildGrowthHistorySkeleton />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : isError ? (
        <Box sx={{ position: 'relative', height: '100%' }}>
          <Error title="Произошла ошибка :(" />
        </Box>
      ) : isSuccess && Boolean(childGrowthHistories?.data.length) ? (
        <ChildGrowthHistoryGrid list={childGrowthHistories} />
      ) : (
        <Box sx={{ position: 'relative', height: '100%' }}>
          <Empty title="Нет данных" />
        </Box>
      )}
    </>
  );
};

export default ChildGrowthHistory;
