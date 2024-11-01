
import React, { createContext } from "react";
import { Alert, AlertColor, AlertTitle, Snackbar } from "@mui/material";

type AlertVariant = "filled" | "outlined" | "standard";

type TSnackState = {
  open: boolean;
  message: string;
  options?: TSnackBarOptions;
};

export type OpenSnackFunction = (
  message: string,
  options?: TSnackBarOptions
) => void;

type TSnackBarOptions = {
  title?: string;
  severity?: AlertColor;
  timeout?: number;
  alertVariant?: AlertVariant;
};

type TSnackContext = {
  openSnack(message: string, options?: TSnackBarOptions): void;
};

export const SnackContext = createContext<TSnackContext>({
  openSnack() {
    //do nothing
  },
});

export const useSnack = () => React.useContext(SnackContext);

export const SnackBarProvider = ({
                                   children,
                                 }: {
  children?: React.ReactNode;
}) => {
  const initialState: TSnackState = {
    open: false,
    message: "",
  };
  const [snackBarState, setSnackBarState] =
    React.useState<TSnackState>(initialState);

  const handleClose = () => {
    setSnackBarState(initialState);
  };

  const openSnack = (message: string, options?: TSnackBarOptions) => {
    setSnackBarState({
      open: true,
      message,
      options,
    });
  };

  return (
    <SnackContext.Provider
      value={{
        openSnack,
      }}
    >
      {children}
      <Snackbar
        open={snackBarState.open}
        autoHideDuration={snackBarState.options?.timeout || 6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarState.options?.severity || "info"}
          variant={snackBarState.options?.alertVariant}
          sx={{ width: "100%" }}
        >
          {snackBarState.options?.title && (
            <AlertTitle>{snackBarState.options.title}</AlertTitle>
          )}
          {snackBarState.message}
        </Alert>
      </Snackbar>
    </SnackContext.Provider>
  );
};
