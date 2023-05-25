import { Ref, forwardRef, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export type PasswordFieldProps = TextFieldProps;

const PasswordField = forwardRef((props: PasswordFieldProps, ref: Ref<HTMLDivElement>) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      ref={ref}
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ marginRight: -0.65 }}>
            <IconButton size="small" onClick={() => setVisible(!visible)}>
              {visible ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

export default PasswordField;
