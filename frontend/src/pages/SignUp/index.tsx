import { Link as RouterLink } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Box, Link, Typography, Button, Stack, InputAdornment, TextField } from '@mui/material';
import { Person } from '@mui/icons-material';

import { User } from '@/types';
import { useAuth, useTitle } from '@/providers';
import { PasswordField } from '@/components';

const SignUpPage = () => {
  useTitle({ title: 'Регистрация' });
  const { register, isLoading } = useAuth();

  const INITIAL_VALUES: User = { username: '', password: '', firstName: '', lastName: '', fatherName: '' };
  const VALIDATION_SCHEMA = yup.object().shape({
    username: yup.string().min(4, 'Минимальная длина - 4 символа').required('Обязательное поле'),
    password: yup.string().min(6, 'Минимальная длина - 6 символов').required('Обязательное поле'),
    firstName: yup.string().required('Обязательное поле'),
    lastName: yup.string().required('Обязательное поле'),
    fatherName: yup.string(),
  });

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={register}>
      {({ values, touched, errors, handleChange }) => (
        <Form>
          <Stack spacing={3.5}>
            <Box>
              <Typography component="h1" variant="h1" color="text.secondary" gutterBottom>
                Создайте свой аккаунт
              </Typography>

              <Typography>
                Если у вас уже есть свой аккаунт, то{' '}
                <Link component={RouterLink} to="/auth/sign-in">
                  авторизуйтесь
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

              <TextField
                name="firstName"
                label="Имя"
                placeholder="Введите имя"
                value={values.firstName}
                onChange={handleChange}
                disabled={isLoading}
                helperText={touched.firstName ? errors.firstName : ''}
                error={Boolean(touched.firstName && errors.firstName)}
              />

              <TextField
                name="lastName"
                label="Фамилия"
                placeholder="Введите фамилию"
                value={values.lastName}
                onChange={handleChange}
                disabled={isLoading}
                helperText={touched.lastName ? errors.lastName : ''}
                error={Boolean(touched.lastName && errors.lastName)}
              />

              <TextField
                name="fatherName"
                label="Отчество"
                placeholder="Введите отчество"
                value={values.fatherName}
                onChange={handleChange}
                disabled={isLoading}
                helperText={touched.fatherName ? errors.fatherName : ''}
                error={Boolean(touched.fatherName && errors.fatherName)}
              />

              <Button size="large" type="submit" disabled={isLoading} variant="contained" fullWidth>
                Регистрация
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpPage;
