import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Forgot from "./pages/Forgot.jsx";
import Home from "./pages/Home.jsx";
import Avatars from "./pages/Avatars.jsx";
import Convai from "./pages/Convai.jsx";
import Portal from "./pages/Portal.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />

      {/* App */}
      <Route path="/home" element={<Home />} />
      <Route path="/avatars" element={<Avatars />} />
      <Route path="/convai" element={<Convai />} />
      <Route path="/portal" element={<Portal />} />

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
