import { TextField, TextFieldProps } from "@mui/material";

export const StandardInput = ({
                                variant,
                                fullWidth,
                                ...rest
                              }: TextFieldProps) => {
  return (
    <TextField
      onWheel={(e) => e.currentTarget.blur()}
      autoComplete="off"
      fullWidth={fullWidth || true}
      variant={variant || "standard"}
      {...rest}
    />
  );
};

export default StandardInput;
