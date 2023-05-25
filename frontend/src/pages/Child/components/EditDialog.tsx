import { useState } from 'react';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { Child, ServerError } from '@/types';
import { childApi, fileApi } from '@/services';
import { AvatarInput } from '@/components';

export interface EditChildDialogProps extends DialogProps {
  child: Child;
  onClose(): void;
}

const { useUpdateChildMutation } = childApi;
const { useUploadFileMutation } = fileApi;

const EditChildDialog = ({ child, onClose, ...props }: EditChildDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [uploadPhoto] = useUploadFileMutation();
  const [updateChild] = useUpdateChildMutation();

  const [loading, setLoading] = useState(false);

  const VALIDATION_SCHEMA = yup.object().shape({
    birthday: yup.date().nullable().typeError('Пожалуйста, выберите дату').required('Пожалуйста, выберите дату'),
    name: yup.string().required('Обязательное поле'),
  });

  async function handleSubmit({ photo, ...child }: Child, { resetForm }: FormikHelpers<Child>) {
    try {
      setLoading(true);

      await updateChild({
        ...child,
        photo: photo instanceof File ? (await uploadPhoto(photo as File).unwrap()).filename : photo,
      }).unwrap();

      onClose();
      resetForm();
    } catch (error) {
      enqueueSnackbar((error as ServerError).data, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog {...props} fullWidth onClose={onClose}>
      <DialogTitle>
        <b>Редактировать данные ребенка</b>
      </DialogTitle>

      <Formik<Child>
        initialValues={child}
        validationSchema={VALIDATION_SCHEMA}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, setFieldValue, handleChange }) => (
          <Form>
            <DialogContent dividers>
              <Stack spacing={4}>
                <AvatarInput
                  name="photo"
                  value={String(values.photo)}
                  error={Boolean(touched.photo && errors.photo)}
                  helperText={touched.photo && errors.photo}
                  onChange={(file) => setFieldValue('photo', file)}
                  disabled={loading}
                />

                <Stack spacing={2} direction="row">
                  <TextField
                    name="name"
                    label="Имя"
                    placeholder="Введите имя"
                    value={values.name}
                    onChange={handleChange}
                    disabled={loading}
                    fullWidth
                    helperText={touched.name ? errors.name : ''}
                    error={Boolean(touched.name && errors.name)}
                  />

                  <DatePicker
                    label="Дата рождения"
                    value={moment(values.birthday)}
                    onChange={(value) => setFieldValue('birthday', moment(value).toDate())}
                    disabled={loading}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        helperText: touched.birthday ? errors.birthday : '',
                        error: Boolean(touched.birthday && errors.birthday),
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </DialogContent>

            <DialogActions>
              <Button size="small" variant="outlined" disabled={loading} color="error" onClick={onClose}>
                Отмена
              </Button>

              <Button size="small" variant="contained" disabled={loading} type="submit">
                Добавить
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditChildDialog;
