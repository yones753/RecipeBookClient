import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import LoginPage from "../auth/LoginPage";
import RecipeList from '../recipe/RecipeList'
import Ingredients from "../ingredients/Ingredients"

function RoutesComponent() {
  const { isLoggedIn, isAdmin } = useAuth();
  const redirectToLogin = <Navigate to="/login" />;
  const redirectToMain = <Navigate to="/" />;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/recipes" /> : redirectToLogin}
      />
      <Route
        path="/recipes"
        element={isLoggedIn ? <RecipeList /> : redirectToLogin}
      />
      <Route
        path="/ingredients"
        element={isLoggedIn ? isAdmin ? <Ingredients /> :redirectToMain : redirectToLogin}
      />

    </Routes>
  );
}

export default RoutesComponent;
