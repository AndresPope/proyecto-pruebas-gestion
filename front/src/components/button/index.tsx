import {
  Button,
  ButtonProps,
  CircularProgress,
  IconButton,
  IconButtonProps,
  Tooltip,
} from "@mui/material";

type Props = ButtonProps & {
  loading?: boolean;
};

export const LocalButton = ({
                              loading,
                              children,
                              disabled,
                              ...rest
                            }: Props) => {
  return (
    <Button {...rest} disabled={loading || disabled}>
      {loading && <CircularProgress size={20} sx={{ mr: 1 }} />}
      {children}
    </Button>
  );
};

type IconProps = IconButtonProps & {
  loading?: boolean;
  tooltipTitle?: string;
};

export const LocalIconButton = ({
                                  loading,
                                  children,
                                  disabled,
                                  tooltipTitle,
                                  ...rest
                                }: IconProps) => {
  return (
    <Tooltip title={tooltipTitle}>
      <span>
        <IconButton {...rest} disabled={loading || disabled}>
          {loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : children}
        </IconButton>
      </span>
    </Tooltip>
  );
};
