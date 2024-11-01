import {
  Box,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  children?: React.ReactNode;
  error?: unknown;
  message?: string;
};

export const ErrorComponent = ({ message, error, children }: Props) => (
  <Box
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    width={"100%"}
    height={"100%"}
    marginTop={"15rem"}
    marginLeft={{
      xs: "1rem",
      sm: "0",
    }}
    flexDirection={"column"}
    gap={2}
    pb={5}
  >
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      gap={1}
      alignItems={"center"}
      maxWidth={{
        xs: "70%",
        sm: "50%",
      }}
    >
      <ErrorIcon color={"error"} />
      <Typography
        sx={{
          textAlign: "center",
        }}
        variant={"h6"}
        maxWidth={"100%"}
      >
        {message}
      </Typography>
    </Stack>
    <Accordion
      sx={{
        width: "60%",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={"bold"}>Ver detalle del error</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          overflow: "auto",
        }}
      >
        <Typography>{JSON.stringify(error)}</Typography>
      </AccordionDetails>
    </Accordion>
    {children}
  </Box>
);
