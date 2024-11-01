import React from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {
  Dialog,
  DialogTitle,
  Divider,
} from "@mui/material";
import { LocalButton, LocalIconButton } from "../../../components/button";
import { ClientDataForm } from "./create-client-form.tsx";
import { Close } from "@mui/icons-material";
import { useCreateClient } from "../hooks";
import { ClientInput } from "../types.ts";
import { FormikHelpers } from "formik";

export const CreateClient = () => {
  const [open, setOpen] = React.useState(false);

  const handleChangeDialogState = () => setOpen(!open);

  const { mutate: createClient } = useCreateClient();

  const initialValues = {
    nit: "",
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    birthdate: "",
    phone: "",
    email: "",
  };

  const handleSubmit = (values: ClientInput, actions: FormikHelpers<ClientInput>) => {
    createClient(values);
    actions.resetForm();
  };

  return (
    <>
      <LocalButton
        endIcon={<AddCircleRoundedIcon />}
        variant={"outlined"}
        size={"small"}
        sx={{ alignSelf: "flex-end", my: 1 }}
        onClick={handleChangeDialogState}
      >
        Agregar Cliente
      </LocalButton>
      <Dialog open={open} fullWidth={true} onClose={handleChangeDialogState}>
        <DialogTitle
          sx={{ background: "#292929" }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          Agregar un Nuevo Cliente
          <LocalIconButton onClick={handleChangeDialogState}>
            <Close />
          </LocalIconButton>
        </DialogTitle>
        <Divider />
        <ClientDataForm handleSubmit={handleSubmit} initialValues={initialValues} />
      </Dialog>
    </>
  );

};