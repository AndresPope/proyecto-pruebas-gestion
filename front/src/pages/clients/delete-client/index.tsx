import { LocalButton, LocalIconButton } from "../../../components/button";
import { Close, Delete } from "@mui/icons-material";
import { useDeleteClient } from "../hooks";
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import React from "react";

type Props = {
  id: string
}

export const DeleteClient = ({ id }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleChangeDialogState = () => setOpen(!open);

  const { mutate: deleteClient } = useDeleteClient();


  return (
    <>
      <LocalIconButton onClick={handleChangeDialogState} tooltipTitle={"Borrar cliente"}>
        <Delete />
      </LocalIconButton>
      <Dialog open={open} fullWidth={true} onClose={handleChangeDialogState}>
        <DialogTitle
          sx={{ background: "#292929" }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          Eliminar cliente
          <LocalIconButton onClick={handleChangeDialogState}>
            <Close />
          </LocalIconButton>
        </DialogTitle>
        <Divider
          sx={{ background: "#292929" }}
        />
        <DialogContent
          sx={{ background: "#292929" }}
        >
          <Typography textAlign={"center"} fontSize={"large"} fontWeight={"bold"}>
            ¿Estás seguro de que deseas eliminar este cliente?
          </Typography>
        </DialogContent>
        <Divider
          sx={{ background: "#292929" }}
        />
        <DialogActions
          sx={{ background: "#292929" }}
        >
          <LocalButton
            variant={"contained"}
            color={"error"}
            size={"small"}
            endIcon={<Delete />}
            onClick={() => {
              deleteClient({ id });
              handleChangeDialogState();
            }}
          >
            Eliminar Cliente
          </LocalButton>
        </DialogActions>
      </Dialog>
    </>

  );

};