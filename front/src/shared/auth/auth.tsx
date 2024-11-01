import React, { createContext, useContext } from "react";
import { User } from "../types.ts";
import Cookie from "js-cookie";
import { LoggedInUser } from "../../pages/login/types.ts";

interface AuthContext {
  handleSetUser: (response: LoggedInUser) => void;
  handleLogout: () => void;
  getUser: () => User;
}

const emptyData = {
  handleSetUser: () => {
  },
  handleLogout: () => {
  },
  getUser: () => ({
    userId: "",
    username: "",
  }),
};

const AuthContext = createContext<AuthContext>(emptyData);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const handleSetUser = ({ user, token }: LoggedInUser) => {
    Cookie.set("access_token", token);
    window.localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
  };

  const getUser = () => {
    const user = window.localStorage.getItem("user");
    return user ? JSON.parse(user) : { userId: "", username: "" };
  };

  return (
    <AuthContext.Provider value={{ handleSetUser, handleLogout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};




