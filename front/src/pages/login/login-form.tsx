import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { InputAdornment, Stack } from "@mui/material";
import StandardInput from "../../components/text-field";
import { LocalButton, LocalIconButton } from "../../components/button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginUser } from "./hooks";
import { LoginValues } from "./types.ts";
import { useSnack } from "../../components/snack-bar";
import { getErrorMessage } from "../../shared/ts-error-handling.ts";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Digita el usuario").length(8, "El usuario se debe componer de 8 caracteres"),
  password: Yup.string().required("Digita la contraseña"),
});

type Props = {
  initialUsername: string
}

export const LoginForm = ({ initialUsername }: Props) => {
  const [pwdVisibility, setPwdVisibility] = useState<boolean>(false);
  const { openSnack } = useSnack();

  const { mutateAsync: loginUser } = useLoginUser();

  const handleSubmit = async (values: LoginValues) => {
    try {
      await loginUser(values);
    } catch (e) {
      const message = getErrorMessage(e);
      openSnack(message, { severity: "error" });
    }
  };

  return (
    <Formik
      initialValues={{ username: initialUsername, password: "" }}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      {({ touched, errors }) => (
        <Form>
          <Stack gap={2}>
            <Field
              as={StandardInput}
              name="username"
              label="Nombre de usuario"
              type={"text"}
              helperText={(touched.username && errors.username)}
              error={touched.username && Boolean(errors.username)}
            />
            <Field
              as={StandardInput}
              name="password"
              label="Contraseña"
              type={pwdVisibility ? "text" : "password"}
              helperText={(touched.password && errors.password)}
              error={touched.password && Boolean(errors.password)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocalIconButton onClick={() => setPwdVisibility(!pwdVisibility)}>
                      {pwdVisibility ? <Visibility /> : <VisibilityOff />}
                    </LocalIconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LocalButton type={"submit"} size={"small"} variant={"contained"}>Iniciar Sesión</LocalButton>
          </Stack>
        </Form>
      )}

    </Formik>
  );

};