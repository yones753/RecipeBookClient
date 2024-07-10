import React, { createContext, useState, useContext } from "react";
import * as jose from "jose";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const storedToken = sessionStorage.getItem("token");
  const storedRoles = sessionStorage.getItem("role");
  const storedUserName = sessionStorage.getItem("currentUserName");

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [currentUserName, setCurrentUserName] = useState(storedUserName);
  const [currentUserRoles, setCurrentUserRoles] = useState(
    storedRoles ? storedRoles.split(",") : []
  );
  const [token, setToken] = useState(storedToken);

  const login = (token) => {
    try {
      const decoded = jose.decodeJwt(token);
      const { sub, role } = decoded; // Assuming these fields are in your token's payload

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("currentUserName", sub);

      setToken(token);
      setCurrentUserName(sub);
      setCurrentUserRoles(role.split(","));
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentUserName");
    sessionStorage.removeItem("role");
    setToken(null);
    setCurrentUserName(null);
    setCurrentUserRoles([]);
    setIsLoggedIn(false);
  };
  let isAdmin = false
  if (currentUserRoles)
    isAdmin = currentUserRoles.includes("ADMIN");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        login,
        logout,
        currentUserName,
        currentUserRoles,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
