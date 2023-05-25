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
import { FILE_SIZE, SUPPORTED_FORMATS } from '@/utils/constants';
import { AvatarInput } from '@/components';

export interface AddChildDialogProps extends DialogProps {
  onClose(): void;
}

const { useCreateChildMutation } = childApi;
const { useUploadFileMutation } = fileApi;

const AddChildDialog = ({ onClose, ...props }: AddChildDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [uploadPhoto] = useUploadFileMutation();
  const [createChild] = useCreateChildMutation();

  const [loading, setLoading] = useState(false);

  const INITIAL_VALUES: Child = { birthday: null, photo: null, name: '' };
  const VALIDATION_SCHEMA = yup.object().shape({
    photo: yup
      .mixed<File>()
      .nullable()
      .test('fileSize', 'Вес файла не должен превышать 30мб', (file) => (!file ? true : file.size <= FILE_SIZE))
      .test('fileFormat', 'Недопустимый формат файла', (file) =>
        !file ? true : file && SUPPORTED_FORMATS.includes(file.type),
      )
      .required('Обязательное поле'),
    birthday: yup.date().nullable().typeError('Пожалуйста, выберите дату').required('Пожалуйста, выберите дату'),
    name: yup.string().required('Обязательное поле'),
  });

  async function handleSubmit({ photo, ...child }: Child, { resetForm }: FormikHelpers<Child>) {
    try {
      setLoading(true);

      await createChild({
        ...child,
        photo: photo && (await uploadPhoto(photo as File).unwrap()).filename,
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
        <b>Добавить ребенка</b>
      </DialogTitle>

      <Formik<Child> initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={handleSubmit}>
        {({ values, touched, errors, setFieldValue, handleChange }) => (
          <Form>
            <DialogContent dividers>
              <Stack spacing={4}>
                <AvatarInput
                  name="photo"
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
                    value={values.birthday}
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

export default AddChildDialog;
