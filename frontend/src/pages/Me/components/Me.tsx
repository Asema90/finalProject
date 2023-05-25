import { Box, Grid } from '@mui/material';

import { childApi } from '@/services';
import { Empty, Error } from '@/components';
import { ChildSkeleton } from '@/pages/Child/components';

import { ChildrenGrid } from '.';

const { useGetChildrenQuery } = childApi;

const Me = () => {
  const { data: children, isLoading, isFetching, isError, isSuccess } = useGetChildrenQuery({});

  return (
    <>
      {isLoading || isFetching ? (
        <Box>
          <Grid container spacing={3}>
            {[1, 2, 3].map((key) => (
              <Grid item lg={4} md={6} xs={12} key={key}>
                <ChildSkeleton />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : isError ? (
        <Box sx={{ position: 'relative', p: 10 }}>
          <Error title="Произошла ошибка :(" />
        </Box>
      ) : isSuccess && Boolean(children?.data.length) ? (
        <ChildrenGrid list={children} />
      ) : (
        <Box sx={{ position: 'relative', p: 10 }}>
          <Empty title="Нет данных" />
        </Box>
      )}
    </>
  );
};

export default Me;
