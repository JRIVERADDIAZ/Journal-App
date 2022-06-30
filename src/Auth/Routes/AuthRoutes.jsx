import { Route, Routes, Navigate } from "react-router-dom";
import { RegisterPage, LoginPage } from "../Pages";

export const AuthRoutes = () => {
  return (
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

      <Route path='/*' element={<Navigate to="/" />} />
      </Routes>
  );
};
