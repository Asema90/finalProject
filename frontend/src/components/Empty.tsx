import { forwardRef, memo, Ref } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { DataArray } from '@mui/icons-material';

export interface EmptyProps extends BoxProps {
  title: string;
}

const Empty = forwardRef(({ title, ...props }: EmptyProps, ref: Ref<EmptyProps>) => {
  return (
    <Box
      {...props}
      ref={ref}
      sx={{
        ...props.sx,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DataArray fontSize="large" />

      <Typography component="h2" variant="h3">
        {title}
      </Typography>
    </Box>
  );
});

const MemoizedEmpty = memo(Empty);

export default MemoizedEmpty;
