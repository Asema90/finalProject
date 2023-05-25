import { Box, Paper, Skeleton, Stack } from '@mui/material';

const ChildSkeleton = () => (
  <Paper component={Stack} spacing={2} elevation={3} sx={{ overflow: 'hidden' }}>
    <Skeleton variant="rectangular" height={220} />

    <Stack spacing={1.3} sx={{ px: 2, pb: 2 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Skeleton width={200} height={28} />
          <Skeleton width={80} height={20} />
        </Box>

        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
        </Stack>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Skeleton width={90} height={20} />
      </Box>
    </Stack>
  </Paper>
);

export default ChildSkeleton;
