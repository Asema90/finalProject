import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { childApi } from '@/services';
import { useTitle } from '@/providers';
import { Empty, Error } from '@/components';

import { ChildCard, ChildSkeleton } from '.';

const { useGetChildQuery } = childApi;

const Child = () => {
  const { id } = useParams<{ id: string }>();

  const { data: child, isLoading, isFetching, isError, isSuccess } = useGetChildQuery({ id });

  useTitle({ title: child?.name, canGoBack: true });

  return (
    <>
      {isLoading || isFetching ? (
        <ChildSkeleton />
      ) : isError ? (
        <Box sx={{ position: 'relative', p: 10 }}>
          <Error title="Произошла ошибка :(" />
        </Box>
      ) : isSuccess && Boolean(child) ? (
        <ChildCard {...child} editChild addGrowthHistory />
      ) : (
        <Box sx={{ position: 'relative', p: 10 }}>
          <Empty title="Нет данных" />
        </Box>
      )}
    </>
  );
};

export default Child;
