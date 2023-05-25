import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import theme from '@/theme';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        minHeight: '100vh',
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Container
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Outlet />
      </Container>

      <AuthLayoutImage src="/background.png" />
    </Box>
  );
};

const AuthLayoutImage = ({ src }: { src: string }) => (
  <Box
    sx={{
      position: 'absolute',
      width: '50%',
      top: 0,
      right: 0,
      bottom: 0,
      display: 'grid',
      placeItems: 'center',
      backgroundColor: theme.palette.background.default,
    }}
  >
    <Box component="img" alt="image" sx={{ maxWidth: '100%', objectFit: 'cover' }} src={src} />
  </Box>
);

export default AuthLayout;
