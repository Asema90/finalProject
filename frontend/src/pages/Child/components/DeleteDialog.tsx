import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Child, ServerError } from '@/types';
import { ConfirmDialog } from '@/dialogs';
import { ConfirmDialogProps } from '@/dialogs/Confirm';
import { childApi } from '@/services';
import theme from '@/theme';

export interface DeleteChildProps extends ConfirmDialogProps {
  child: Child | null;
  onClose(): void;
}

const { useDeleteChildMutation } = childApi;

const DeleteChild = ({ child, onClose, ...props }: DeleteChildProps) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [deleteChild, deleteChildState] = useDeleteChildMutation();

  async function handleDeleteChild() {
    if (!child) return;

    try {
      await deleteChild(child).unwrap();

      onClose();

      setTimeout(() => navigate('/me'), theme.transitions.duration.short);
    } catch (error) {
      enqueueSnackbar((error as ServerError).data, { variant: 'error' });
    }
  }

  return (
    <ConfirmDialog
      {...props}
      disabled={deleteChildState.isLoading}
      onClose={onClose}
      confirmText="Вы действительно хотите удалить?"
      onConfirm={handleDeleteChild}
    />
  );
};

export default DeleteChild;
