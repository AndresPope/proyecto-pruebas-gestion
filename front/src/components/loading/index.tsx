import { ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";

type Props = {
  children?: ReactNode
  size?: number | string
}

export const LoadingComponent = ({ children, size = 80 }: Props) => (
  <Box
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    width={"100vw"}
    height={"100vh"}
  >
    <CircularProgress size={size} />
    {children}
  </Box>
);
