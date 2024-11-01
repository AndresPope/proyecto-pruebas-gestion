import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login";
import { RequireAuth } from "./shared";
import { PrincipalMenu } from "./pages/menu";
import { ClientsPage } from "./pages/clients";

export const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<LoginPage />} />
      <Route path={"/home"} element={
        <RequireAuth>
          <PrincipalMenu />
        </RequireAuth>
      } />
      <Route path={"/clients"} element={
        <RequireAuth>
          <ClientsPage />
        </RequireAuth>
      } />
    </Routes>
  );
};