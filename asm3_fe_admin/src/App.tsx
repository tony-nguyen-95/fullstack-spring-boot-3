import "./App.css";
import { DetailOrder, Login, Orders, Products } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* Redirect from root path "/" to "/users" */}
      <Route path="/" element={<Navigate to="/products" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/products" element={<Products />} />

      <Route path="/orders" element={<Orders />} />

      <Route path="/orders/:id" element={<DetailOrder />} />
    </Routes>
  );
}

export default App;
