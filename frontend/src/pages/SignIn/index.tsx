import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { Person } from '@mui/icons-material';

import { Cridentials } from '@/types';
import { useAuth, useTitle } from '@/providers';
import { PasswordField } from '@/components';

const SignInPage = () => {
  useTitle({ title: 'Авторизация' });

  const { login, isLoading } = useAuth();

  const INITIAL_VALUES: Cridentials = { username: '', password: '' };
  const VALIDATION_SCHEMA = yup.object().shape({
    username: yup.string().min(4, 'Минимальная длина - 4 символа').required('Обязательное поле'),
    password: yup.string().min(6, 'Минимальная длина - 6 символов').required('Обязательное поле'),
  });

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={login}>
      {({ values, touched, errors, handleChange }) => (
        <Form>
          <Stack spacing={3}>
            <Box>
              <Typography component="h1" variant="h1" color="text.secondary" gutterBottom>
                Добро пожаловать
              </Typography>

              <Typography>
                У вас нет аккаунта? Пройдите{' '}
                <Link component={RouterLink} to="/auth/sign-up">
                  регистрацию
                </Link>
              </Typography>
            </Box>

            <Stack sx={{ maxWidth: 400 }} spacing={4}>
              <TextField
                name="username"
                label="Логин"
                placeholder="Введите логин"
                value={values.username}
                onChange={handleChange}
                disabled={isLoading}
                helperText={touched.username ? errors.username : ''}
                error={Boolean(touched.username && errors.username)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />

              <PasswordField
                name="password"
                label="Пароль"
                placeholder="Введите пароль"
                value={values.password}
                onChange={handleChange}
                disabled={isLoading}
                helperText={touched.password ? errors.password : ''}
                error={Boolean(touched.password && errors.password)}
              />

              <Button size="large" type="submit" disabled={isLoading} variant="contained" fullWidth>
                Войти
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SignInPage;
