import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from '@mui/material';

export interface ConfirmDialogProps extends DialogProps {
  confirmText?: string;
  disabled?: boolean;
  onClose(): void;
  onConfirm?(): void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  confirmText,
  children,
  disabled,
  onClose,
  onConfirm,
  ...props
}) => {
  return (
    <Dialog fullWidth maxWidth="xs" {...props}>
      <DialogTitle>Подтвердить действие</DialogTitle>

      <DialogContent dividers>
        {confirmText && <DialogContentText>{confirmText}</DialogContentText>}

        {children}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" disabled={disabled} onClick={onClose}>
          Отмена
        </Button>

        {onConfirm && (
          <Button color="error" variant="contained" disabled={disabled} onClick={onConfirm}>
            Подтвердить
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
