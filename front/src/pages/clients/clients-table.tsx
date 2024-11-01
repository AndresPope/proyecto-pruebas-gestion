import { TClient } from "./types.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EditClient } from "./edit-client";
import { DeleteClient } from "./delete-client";

type Props = {
  clients: TClient[]
}

export const ClientsTable = ({ clients }: Props) => {

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NIT</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nit}
              </TableCell>
              <TableCell
              >{row.firstName} {row.secondName} {row.firstLastName} {row.secondLastName}</TableCell>
              <TableCell>{row.birthdate}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell><EditClient client={row} /> <DeleteClient id={row.id} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

};