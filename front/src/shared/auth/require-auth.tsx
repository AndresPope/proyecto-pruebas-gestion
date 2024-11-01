import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.tsx";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { getUser } = useAuth();

  const user = getUser();

  if (user.username === "") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
