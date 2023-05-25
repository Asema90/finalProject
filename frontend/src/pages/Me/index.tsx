import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import { useTitle } from '@/providers';
import { AddChildDialog } from '@/pages/Child/components';

import { Me } from './components';

const MePage = () => {
  useTitle({ title: 'Личный кабинет' });

  const [addChildDialogOpened, setOpenedAddChildDialog] = useState(false);

  return (
    <>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size="small" variant="outlined" endIcon={<Add />} onClick={() => setOpenedAddChildDialog(true)}>
            Добавить
          </Button>
        </Box>

        <Me />
      </Stack>

      <AddChildDialog open={addChildDialogOpened} onClose={() => setOpenedAddChildDialog(false)} />
    </>
  );
};

export default MePage;
