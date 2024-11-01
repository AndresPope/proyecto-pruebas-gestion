import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { InputAdornment, Stack } from "@mui/material";
import * as Yup from "yup";
import StandardInput from "../../components/text-field";
import { LocalButton, LocalIconButton } from "../../components/button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRegisterUser } from "./hooks";
import { RegisterValues } from "./types.ts";
import { getErrorMessage } from "../../shared/ts-error-handling.ts";
import { useSnack } from "../../components/snack-bar";

type Props = {
  handleBackToLogin: (username: string) => void
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Digita el usuario").length(8, "El usuario se debe componer de 8 caracteres"),
  password: Yup.string()
    .min(8, "Debe tener al menos 8 caracteres")
    .required("Este campo es requerido")
    .matches(/[A-Z]/, "Debe tener al menos una mayuscula")
    .matches(/[a-z]/, "Debe tener al menos una minuscula")
    .matches(/[0-9]/, "Debe tener al menos un numero")
    .matches(
      /[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/,
      "La contraseña debe tener al menos un caracter especial",
    ),
  confirmPwd: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Este campo es requerido"),
});

export const RegisterForm = ({ handleBackToLogin }: Props) => {
  const [pwdVisibility, setPwdVisibility] = useState<boolean>(false);
  const { openSnack } = useSnack();
  const { mutateAsync: registerUser } = useRegisterUser();

  const handleSubmit = async (values: RegisterValues) => {
    try {

      const { username } = await registerUser(values);
      openSnack("Usuario registrado correctamente", { severity: "success" });
      handleBackToLogin(username);
    } catch (e) {
      const message = getErrorMessage(e);
      openSnack(message, { severity: "error" });
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "", confirmPwd: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Stack gap={2}>
            <Field
              as={StandardInput}
              name="username"
              label="Nombre de usuario"
              type={"text"}
              helperText={(touched.username && errors.username) || "El usuario debe contener 8 caracteres, la letra inicial debe ser mayuscula y el caracter final debe ser numerico"}
              error={touched.username && Boolean(errors.username)}
            />
            <Field
              as={StandardInput}
              name="password"
              label="Contraseña"
              type={pwdVisibility ? "text" : "password"}
              helperText={(touched.password && errors.password) || "la contraseña debe contener 8 caracteres, al menos una letra minuscula y mayuscula, al menos un numero y al menos un caracter especial"}
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
            <Field
              as={StandardInput}
              name="confirmPwd"
              label="Confirmar Contraseña"
              type={pwdVisibility ? "text" : "password"}
              helperText={touched.confirmPwd && errors.confirmPwd}
              error={touched.confirmPwd && Boolean(errors.confirmPwd)}
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
            <LocalButton type={"submit"} size={"small"} variant={"contained"}>Crear Cuenta</LocalButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );

};