import { useState } from 'react';
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

import { ChildGrowthHistory, ServerError } from '@/types';
import { childGrowthHistoryApi } from '@/services';

export interface EditChildGrowthHistoryDialogProps extends DialogProps {
  childGrowthHistory: ChildGrowthHistory;
  onClose(): void;
}

const { useUpdateChildGrowthHistoryMutation } = childGrowthHistoryApi;

const EditChildGrowthHistoryDialog = ({ childGrowthHistory, onClose, ...props }: EditChildGrowthHistoryDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [updateChildGrowthHistory] = useUpdateChildGrowthHistoryMutation();

  const [loading, setLoading] = useState(false);

  const VALIDATION_SCHEMA = yup.object().shape({
    headCircumference: yup.number().min(30, 'Минимальное значение - 30 (см)').required('Обязательное поле'),
    height: yup.number().min(40, 'Минимальное значение - 40 (см)').required('Обязательное поле'),
    weight: yup.number().min(2000, 'Минимальное значение - 2000 (г)').required('Обязательное поле'),
  });

  async function handleSubmit(
    childGrowthHistory: ChildGrowthHistory,
    { resetForm }: FormikHelpers<ChildGrowthHistory>,
  ) {
    try {
      setLoading(true);

      await updateChildGrowthHistory(childGrowthHistory).unwrap();

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
        <b>Обновить запись в истории роста</b>
      </DialogTitle>

      <Formik<ChildGrowthHistory>
        initialValues={childGrowthHistory}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, handleChange }) => (
          <Form>
            <DialogContent dividers>
              <Stack direction="row" spacing={2}>
                <TextField
                  name="height"
                  type="number"
                  label="Рост (см)"
                  placeholder="Введите рост"
                  value={values.height}
                  onChange={handleChange}
                  disabled={loading}
                  fullWidth
                  helperText={touched.height ? errors.height : ''}
                  error={Boolean(touched.height && errors.height)}
                />

                <TextField
                  name="weight"
                  type="number"
                  label="Вес(г)"
                  placeholder="Введите вес"
                  value={values.weight}
                  onChange={handleChange}
                  disabled={loading}
                  fullWidth
                  helperText={touched.weight ? errors.weight : ''}
                  error={Boolean(touched.weight && errors.weight)}
                />

                <TextField
                  name="headCircumference"
                  type="number"
                  label="Окружность головы (см)"
                  placeholder="Введите значение"
                  value={values.headCircumference}
                  onChange={handleChange}
                  disabled={loading}
                  fullWidth
                  helperText={touched.headCircumference ? errors.headCircumference : ''}
                  error={Boolean(touched.headCircumference && errors.headCircumference)}
                />
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

export default EditChildGrowthHistoryDialog;
