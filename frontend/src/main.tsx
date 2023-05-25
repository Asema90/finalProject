import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/ru';

import { AuthProvider } from '@/providers';
import Router from '@/Router';
import theme from '@/theme';
import store from '@/store';
import Styles from '@/styles';
import { Error, Loader } from '@/components';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <ErrorBoundary FallbackComponent={() => <Error title="Произошла ошибка :(" />}>
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Styles />
              <CssBaseline />

              <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
                  <AuthProvider>
                    <Router />
                  </AuthProvider>
                </LocalizationProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </Suspense>
  </StrictMode>,
);
