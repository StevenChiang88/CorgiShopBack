import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import { useSelector } from "react-redux";
const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="home"
          element={auth.isLogged ? <Homepage /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="orders"
          element={
            auth.isLogged ? <OrdersPage /> : <Navigate to={"/"} replace />
          }
        />

        <Route
          path="products"
          element={
            auth.isLogged ? <ProductsPage /> : <Navigate to={"/"} replace />
          }
        />

        <Route
          path="users"
          element={
            auth.isLogged ? <UsersPage /> : <Navigate to={"/"} replace />
          }
        />
      </Routes>
    </Navbar>
  );
};

export default App;
