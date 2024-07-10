import React from "react";
import "./App.css";
import { AuthProvider } from "./components/auth/AuthContext";
import TopNavBar from "./components/layout/TopNavBar";
import RoutesComponent from "./components/routes/RoutesComponent";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <header style={{ backgroundColor: "#F9F9F9" }}>
          <TopNavBar />
        </header>
        <div className="m-5">
          <RoutesComponent />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
