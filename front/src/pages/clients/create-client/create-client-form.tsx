import { Field, Form, Formik, FormikHelpers } from "formik";
import { DialogActions, DialogContent, Divider, Stack } from "@mui/material";
import StandardInput from "../../../components/text-field";
import { ClientInput } from "../types.ts";
import { LocalButton } from "../../../components/button";
import { clientValidationSchema } from "./client-validation-schema.ts";

type Props = {
  handleSubmit: (values: ClientInput, actions: FormikHelpers<ClientInput>) => void
  initialValues: ClientInput
}

export const ClientDataForm = ({ initialValues, handleSubmit }: Props) => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={clientValidationSchema}>
      {({ errors, touched }) => (
        <Form>
          <DialogContent sx={{ background: "#292929" }}>
            <Stack alignItems={"center"} gap={2}>
              <Field
                as={StandardInput}
                label={"NIT"}
                name={"nit"}
                error={touched.nit && Boolean(errors.nit)}
                helperText={touched.nit && errors.nit}
              />
              <Field
                as={StandardInput}
                label={"Primer Nombre"}
                name={"firstName"}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName} />
              <Field
                as={StandardInput}
                label={"Segundo Nombre"}
                name={"secondName"}
                error={touched.secondName && Boolean(errors.secondName)}
                helperText={touched.secondName && errors.secondName} />
              <Field
                as={StandardInput}
                label={"Primer Apellido"}
                name={"firstLastName"}
                error={touched.firstLastName && Boolean(errors.firstLastName)}
                helperText={touched.firstLastName && errors.firstLastName} />
              <Field
                as={StandardInput}
                label={"Segundo Apellido"}
                name={"secondLastName"}
                error={touched.secondLastName && Boolean(errors.secondLastName)}
                helperText={touched.secondLastName && errors.secondLastName}
              />
              <Field
                as={StandardInput}
                label={"Telefono"}
                name={"phone"}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <Field
                as={StandardInput}
                label={"Correo Electronico"}
                name={"email"}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={StandardInput}
                label={"Fecha de Nacimiento"}
                name={"birthdate"}
                format={"yyyy-MM-dd"}
                type={"date"}
                InputLabelProps={{ shrink: true }}
                error={touched.birthdate && Boolean(errors.birthdate)}
                helperText={touched.birthdate && errors.birthdate}
              />
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ background: "#292929" }}>
            <LocalButton variant={"contained"} type={"submit"} color="primary">
              Guardar
            </LocalButton>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};