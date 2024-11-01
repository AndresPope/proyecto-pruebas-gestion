import React from "react";
import {
  Dialog,
  DialogTitle,
  Divider,
} from "@mui/material";
import { LocalIconButton } from "../../../components/button";
import { ClientDataForm } from "../create-client/create-client-form.tsx";
import { Close, Edit } from "@mui/icons-material";
import { useEditClient } from "../hooks";
import { ClientInput, TClient } from "../types.ts";
import { FormikHelpers } from "formik";

type Props = {
  client: TClient
}

export const EditClient = ({ client }: Props) => {
  const [open, setOpen] = React.useState(false);

  const { id, ...rest } = client;

  const handleChangeDialogState = () => setOpen(!open);

  const { mutate: updateClient } = useEditClient();

  const handleSubmit = (values: ClientInput, actions: FormikHelpers<ClientInput>) => {
    updateClient({ id, input: values });
    actions.resetForm();
  };

  return (
    <>
      <LocalIconButton
        size={"small"}
        onClick={handleChangeDialogState}
      >
        <Edit />
      </LocalIconButton>
      <Dialog open={open} fullWidth={true} onClose={handleChangeDialogState}>
        <DialogTitle
          sx={{ background: "#292929" }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          Actualizar Cliente
          <LocalIconButton onClick={handleChangeDialogState}>
            <Close />
          </LocalIconButton>
        </DialogTitle>
        <Divider />
        <ClientDataForm handleSubmit={handleSubmit} initialValues={rest} />
      </Dialog>
    </>
  );

};