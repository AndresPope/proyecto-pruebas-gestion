import { Paper, Stack, Typography } from "@mui/material";
import { LoginForm } from "./login-form.tsx";
import { RegisterForm } from "./register-form.tsx";
import { useState } from "react";


export const LoginPage = () => {
  const [form, setForm] = useState<"login" | "register">("login");
  const [initialUsername, setInitialUsername] = useState<string>("");
  const paperStyles = {
    width: "30vw",
    p: "2rem",
    borderRadius: "1rem",
    position: "absolute",
    transition: "all 0.5s ease-in-out",
  };

  const loginStyles = {
    ...paperStyles,
    opacity: form === "login" ? 1 : 0,
    transform: form === "login"
      ? "translateX(0) scale(1)"
      : "translateX(-100px) scale(0.8)",
    pointerEvents: form === "login" ? "auto" : "none",
  };

  const registerStyles = {
    ...paperStyles,
    opacity: form === "register" ? 1 : 0,
    transform: form === "register"
      ? "translateX(0) scale(1)"
      : "translateX(100px) scale(0.8)",
    pointerEvents: form === "register" ? "auto" : "none",
  };

  const handleBackToLogin = (username: string) => {
    setForm("login");
    setInitialUsername(username);
  };

  return (
    <Stack justifyContent={"center"} gap={2} alignItems={"center"} height={"100vh"} direction={"row"}>
      <Paper sx={loginStyles}>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography variant={"h4"}>Bienvenido</Typography>
          <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"large"}>
            Digite los siguientes campos para
            iniciar sesión
          </Typography>
        </Stack>
        <LoginForm initialUsername={initialUsername} />
        <Stack mt={1} onClick={() => setForm("register")} color={"#35baf6"} sx={{ cursor: "pointer" }}
               alignItems={"center"}>
          <Typography>Aun no tienes cuenta?</Typography>
          <Typography>Registrate para acceder</Typography>
        </Stack>
      </Paper>
      <Paper sx={registerStyles}>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography variant={"h4"} textAlign={"center"}>Aun no tienes cuenta?</Typography>
          <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"large"}>
            Ingresa tus datos para tener una
          </Typography>
        </Stack>
        <RegisterForm handleBackToLogin={handleBackToLogin} />
        <Stack mt={1} onClick={() => setForm("login")} color={"#35baf6"} sx={{ cursor: "pointer" }}
               alignItems={"center"}>
          <Typography>Ya tienes una cuenta?</Typography>
          <Typography>inicia sesión para acceder</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};