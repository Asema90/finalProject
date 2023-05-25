import { forwardRef, memo, Ref } from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

export interface ErrorProps extends BoxProps {
  title: string;
}

const Error = forwardRef(({ title, ...props }: ErrorProps, ref: Ref<ErrorProps>) => {
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
      <ErrorOutline color="error" fontSize="large" />

      <Typography component="h2" variant="h3">
        {title}
      </Typography>
    </Box>
  );
});

const MemoizedError = memo(Error);

export default MemoizedError;
