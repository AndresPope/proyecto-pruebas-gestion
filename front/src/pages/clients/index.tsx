import { Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useListClients } from "./hooks";
import { LoadingComponent } from "../../components/loading";
import { ErrorComponent } from "../../components/error";
import { getErrorMessage } from "../../shared/ts-error-handling.ts";
import { LocalIconButton } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { ClientsTable } from "./clients-table.tsx";
import { CreateClient } from "./create-client";


export const ClientsPage = () => {
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useListClients();
  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError || !data) {
    const message = getErrorMessage(error);
    return <ErrorComponent message={message} error={error} />;
  }

  const { data: clients } = data;


  return (
    <Stack justifyContent={"center"} gap={2} alignItems={"center"} height={"100vh"} direction={"row"}>
      <Paper sx={{
        width: "80vw",
        p: "2rem",
        borderRadius: "1rem",
        position: "absolute",
        maxHeight: "80vh",
        overflowY: "scroll",
      }}>
        <LocalIconButton onClick={() => navigate("/home")}>
          <ArrowBackIcon />
        </LocalIconButton>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography variant={"h4"}>Clientes</Typography>
          <CreateClient />
          <ClientsTable clients={clients} />
        </Stack>
      </Paper>
    </Stack>
  );

};