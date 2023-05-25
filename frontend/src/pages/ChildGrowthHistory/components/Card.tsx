import { useState } from 'react';
import moment from 'moment';
import { Box, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { ChildGrowthHistory } from '@/types';

import { DeleteChildGrowthHistoryDialog, EditChildGrowthHistoryDialog } from '.';

export type ChildGrowthHistoryCard = ChildGrowthHistory;

const ChildGrowthHistoryCard = (childGrowthHistory: ChildGrowthHistoryCard) => {
  const { headCircumference, height, weight, updatedAt } = childGrowthHistory;

  const [editChildGrowthHistoryDialogOpened, setOpenedEditChildGrowthHistoryDialog] = useState(false);
  const [deleteChildGrowthHistoryDialogOpened, setOpenedDeleteChildGrowthHistoryDialog] = useState(false);

  return (
    <>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography component="h3" variant="h3">
              <b>{moment(updatedAt).format('DD.MM.YYYY')}</b>
            </Typography>

            <Stack direction="row" spacing={4} sx={{ mt: 1 }}>
              <Typography color="text.secondary">
                <b>Рост:</b> {height} (см)
              </Typography>

              <Typography color="text.secondary">
                <b>Вес:</b> {weight} (г)
              </Typography>

              <Typography color="text.secondary">
                <b>Окружность головы:</b> {headCircumference} (см)
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Tooltip title="Редактировать">
              <IconButton size="small" onClick={() => setOpenedEditChildGrowthHistoryDialog(true)}>
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip title="Удалить" onClick={() => setOpenedDeleteChildGrowthHistoryDialog(true)}>
              <IconButton size="small">
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Paper>

      <EditChildGrowthHistoryDialog
        childGrowthHistory={childGrowthHistory}
        open={editChildGrowthHistoryDialogOpened}
        onClose={() => setOpenedEditChildGrowthHistoryDialog(false)}
      />

      <DeleteChildGrowthHistoryDialog
        childGrowthHistory={childGrowthHistory}
        open={deleteChildGrowthHistoryDialogOpened}
        onClose={() => setOpenedDeleteChildGrowthHistoryDialog(false)}
      />
    </>
  );
};

export default ChildGrowthHistoryCard;
