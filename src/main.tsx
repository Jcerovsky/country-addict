import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import { ContextProvider } from "./Context";
import Country from "./components/Country";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/name/:name" element={<Country />} />
          <Route path="/" element={<App />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
