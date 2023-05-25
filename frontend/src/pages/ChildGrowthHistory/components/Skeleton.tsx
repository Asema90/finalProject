import { Box, Paper, Skeleton, Stack } from '@mui/material';

const ChildGrowthHistorySkeleton = () => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Skeleton width={120} height={26} />

          <Stack direction="row" spacing={2.5} sx={{ mt: 1 }}>
            <Skeleton width={120} height={22} />

            <Skeleton width={90} height={22} />

            <Skeleton width={220} height={22} />
          </Stack>
        </Box>

        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ChildGrowthHistorySkeleton;
