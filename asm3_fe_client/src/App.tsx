import "./App.css";
import {
  Carts,
  Home,
  Login,
  Order,
  Product,
  ProductDetail,
  ProfileWithOrders,
  Register,
  Wishlist,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { OrderDetail } from "./pages/orders-detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/carts" element={<Carts />} />

      <Route path="/order" element={<Order />} />

      <Route path="/product" element={<Product />} />

      <Route path="/product/:productId" element={<ProductDetail />} />

      <Route path="/profile-with-orders" element={<ProfileWithOrders />} />

      <Route path="/profile-with-orders/:orderId" element={<OrderDetail />} />

      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  );
}

export default App;
