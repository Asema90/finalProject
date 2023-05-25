import { InputHTMLAttributes, useCallback, useState } from 'react';
import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';
import { Box, ButtonBase, FormHelperText, lighten, styled } from '@mui/material';
import { Delete, Person } from '@mui/icons-material';

import { HOST_NAME } from '@/utils/constants';

export interface AvatarInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  DropzoneProps?: DropzoneOptions;
  error?: boolean;
  helperText?: React.ReactNode;
  size?: number;
  value?: string;
  onChange<T extends File>(file: T | null, fileRejections?: FileRejection[], event?: DropEvent): void;
}

const AvatarInput: React.FC<AvatarInputProps> = ({
  disabled = false,
  error = false,
  helperText,
  size = 200,
  value = '',
  onChange,
  DropzoneProps,
  ...props
}) => {
  const [file, setFile] = useState<(File & { preview: string }) | string | null>(value);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      const [file] = acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));

      onChange(file, fileRejections, event);
      setFile(file);
    },
    [onChange],
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    onDrop,
    disabled: disabled || Boolean(file),
    multiple: false,
    ...DropzoneProps,
  });

  const removeFile = () => {
    acceptedFiles.splice(1, 1);
    setFile(null);
    onChange(null);
  };

  const rootComponent = isDragActive ? AvatarInputActive : error ? AvatarInputError : AvatarInputRoot;

  return (
    <Box component={rootComponent}>
      <label>
        <ButtonBase
          disabled={disabled}
          sx={{ width: size, height: size }}
          {...getRootProps({
            onMouseUp: removeFile,
            onKeyUp: (event: React.KeyboardEvent<HTMLButtonElement>) => event.key === 'Enter' && removeFile(),
          })}
        >
          {file ? (
            <>
              {file instanceof File ? (
                <img src={file?.preview} alt={file?.name} onLoad={() => URL.revokeObjectURL(file.preview)} />
              ) : (
                <img src={`${HOST_NAME}/uploads/${file}`} alt={file} />
              )}

              <DeleteBox>
                <Delete color="error" sx={{ fontSize: size / 3 }} />
              </DeleteBox>
            </>
          ) : (
            <Person sx={{ fontSize: size / 2 }} />
          )}
        </ButtonBase>

        {!file && <input disabled={disabled} type="file" {...getInputProps()} {...props} />}
      </label>

      {helperText && (
        <FormHelperText error={error} sx={{ mx: '14px' }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

const AvatarInputRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& label .MuiButtonBase-root': {
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10em' ry='10em' stroke='%23${theme.palette.primary.dark.slice(
      1,
    )}FF' stroke-width='2.5' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
    borderRadius: '10em',
    overflow: 'hidden',
    transition: `background-color ${theme.transitions.duration.standard}ms`,

    '& img': {
      display: 'block',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100%',
      maxWidth: '100%',
      objectFit: 'cover',
    },
  },

  '& label .MuiButtonBase-root:not(.Mui-disabled)': {
    '&:hover, &:focus': {
      backgroundColor: lighten(theme.palette.primary.light, 0.85),

      '& .MuiBox-root:not(.Mui-disabled)': {
        opacity: 1,
      },
    },
  },
}));

const AvatarInputActive = styled(AvatarInputRoot)(({ theme }) => ({
  color: theme.palette.primary.main,

  '& label .MuiButtonBase-root': {
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10em' ry='10em' stroke='%23${theme.palette.primary.dark.slice(
      1,
    )}FF' stroke-width='2.5' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  },

  '& label .MuiButtonBase-root:not(.Mui-disabled)': {
    '&:hover, &:focus': {
      backgroundColor: lighten(theme.palette.primary.main, 0.65),
    },
  },
}));

const AvatarInputError = styled(AvatarInputRoot)(({ theme }) => ({
  color: theme.palette.error.main,

  '& label .MuiButtonBase-root': {
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10em' ry='10em' stroke='%23${theme.palette.error.dark.slice(
      1,
    )}FF' stroke-width='2.5' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  },

  '& label .MuiButtonBase-root:not(.Mui-disabled)': {
    '&:hover, &:focus': {
      backgroundColor: lighten(theme.palette.error.main, 0.85),
    },
  },
}));

const DeleteBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: 0,
  transition: `opacity ${theme.transitions.duration.standard}ms`,
}));

export default AvatarInput;
