import { forwardRef, memo, Ref } from 'react';
import { Box, BoxProps, CircularProgress } from '@mui/material';

export interface LoaderProps extends BoxProps {
  size?: number;
}

const Loader = forwardRef(({ size = 32, ...props }: LoaderProps, ref: Ref<LoaderProps>) => {
  return (
    <Box
      {...props}
      ref={ref}
      sx={{
        ...props.sx,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
});

const MemoizedLoader = memo(Loader);

export default MemoizedLoader;
