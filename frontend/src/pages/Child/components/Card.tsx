import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Avatar, Box, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { AddCircle, Delete, Edit, Timeline } from '@mui/icons-material';

import { Child } from '@/types';
import { HOST_NAME } from '@/utils/constants';
import { AddChildGrowthHistoryDialog } from '@/pages/ChildGrowthHistory/components';

import { DeleteChildDialog, EditChildDialog } from '.';

export interface ChildCardProps extends Child {
  editChild?: boolean;
  addGrowthHistory?: boolean;
  showGrowthHistory?: boolean;
}

const ChildCard = (child: ChildCardProps) => {
  const {
    _id,
    birthday,
    name,
    photo,
    updatedAt,
    editChild = false,
    addGrowthHistory = false,
    showGrowthHistory = false,
  } = child;

  const navigate = useNavigate();

  const [addChildGrowthHistoryDialogOpened, setOpenedAddChildGrowthHistoryDialog] = useState(false);
  const [editChildDialogOpened, setOpenedEditChildDialog] = useState(false);
  const [deleteChildDialogOpened, setOpenedDeleteChildDialog] = useState(false);

  const currentDate = moment();
  const birthDate = moment(birthday);
  const diff = currentDate.diff(birthDate, 'months');
  const years = Math.floor(diff / 12);
  const months = diff % 12;

  return (
    <>
      <Paper component={Stack} spacing={2} elevation={3}>
        <Box sx={{ alignSelf: 'center' }}>
          <Avatar sx={{ width: 220, height: 220 }} variant="rounded" src={`${HOST_NAME}/uploads/${photo}`} />
        </Box>

        <Stack spacing={1} sx={{ px: 2, pb: 2 }}>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h2" component="h2">
                {name}
              </Typography>

              <Typography color="text.secondary">{birthDate.format('DD.MM.YYYY')}</Typography>

              <Typography color="text.secondary">
                {years} лет {months} месяцев
              </Typography>
            </Box>

            <Box>
              {showGrowthHistory && (
                <Tooltip title="Посмотреть историю">
                  <IconButton size="small" onClick={() => navigate(`/children/${_id}`)}>
                    <Timeline />
                  </IconButton>
                </Tooltip>
              )}

              {addGrowthHistory && (
                <Tooltip title="Добавить запись" onClick={() => setOpenedAddChildGrowthHistoryDialog(true)}>
                  <IconButton size="small">
                    <AddCircle />
                  </IconButton>
                </Tooltip>
              )}

              {editChild && (
                <Tooltip title="Редактировать">
                  <IconButton size="small" onClick={() => setOpenedEditChildDialog(true)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Удалить">
                <IconButton size="small" onClick={() => setOpenedDeleteChildDialog(true)}>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="body2" color="text.secondary">
              {moment(updatedAt).format('DD.MM.YYYY HH:mm')}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <AddChildGrowthHistoryDialog
        child={child}
        open={addChildGrowthHistoryDialogOpened}
        onClose={() => setOpenedAddChildGrowthHistoryDialog(false)}
      />

      <EditChildDialog child={child} open={editChildDialogOpened} onClose={() => setOpenedEditChildDialog(false)} />

      <DeleteChildDialog
        child={child}
        open={deleteChildDialogOpened}
        onClose={() => setOpenedDeleteChildDialog(false)}
      />
    </>
  );
};

export default ChildCard;
