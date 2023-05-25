import { useSnackbar } from 'notistack';

import { ChildGrowthHistory, ServerError } from '@/types';
import { ConfirmDialog } from '@/dialogs';
import { ConfirmDialogProps } from '@/dialogs/Confirm';
import { childGrowthHistoryApi } from '@/services';

export interface DeleteChildGrowthHistoryProps extends ConfirmDialogProps {
  childGrowthHistory: ChildGrowthHistory | null;
  onClose(): void;
}

const { useDeleteChildGrowthHistoryMutation } = childGrowthHistoryApi;

const DeleteChildGrowthHistory = ({ childGrowthHistory, onClose, ...props }: DeleteChildGrowthHistoryProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [deleteChildGrowthHistory, deleteChildGrowthHistoryState] = useDeleteChildGrowthHistoryMutation();

  async function handleDeleteChildGrowthHistory() {
    if (!childGrowthHistory) return;

    try {
      await deleteChildGrowthHistory(childGrowthHistory).unwrap();

      onClose();
    } catch (error) {
      enqueueSnackbar((error as ServerError).data, { variant: 'error' });
    }
  }

  return (
    <ConfirmDialog
      {...props}
      disabled={deleteChildGrowthHistoryState.isLoading}
      onClose={onClose}
      confirmText="Вы действительно хотите удалить запись?"
      onConfirm={handleDeleteChildGrowthHistory}
    />
  );
};

export default DeleteChildGrowthHistory;
