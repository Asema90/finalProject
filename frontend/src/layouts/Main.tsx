import { Outlet } from 'react-router-dom';
import { Box, BoxProps, Container, Stack } from '@mui/material';

import { TitleProvider } from '@/providers';
import { Header } from '@/widgets';
import { CONTAINER_HEIGHT } from '@/utils/constants';
import theme from '@/theme';

export type MainLayoutProps = BoxProps;

const MainLayout = () => {
  return (
    <TitleProvider>
      <Stack>
        <Header />

        <Box component="main" sx={{ flex: 1, backgroundColor: theme.palette.background.default }}>
          <Container sx={{ position: 'relative', minHeight: CONTAINER_HEIGHT, p: 3 }}>
            <Outlet />
          </Container>
        </Box>
      </Stack>
    </TitleProvider>
  );
};

export default MainLayout;
