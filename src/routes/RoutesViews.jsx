import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import NavbarC from "../components/NavbarC";
import FooterC from "../components/FooterC";
import RegisterPage from "../pages/RegisterPage";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import AdminPage from "../pages/AdminPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import FavPages from "../pages/FavPages";
import CartPage from "../pages/CartPage";
import PrivateRoute from "../components/PrivateRoute";

const RoutesViews = () => {
  return (
    <>
      <NavbarC />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={
          <PrivateRoute role='user'>
            <UserPage />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute role='admin'>
            <AdminPage />
          </PrivateRoute>
        } />
        <Route path="/admin-users" element={
          <PrivateRoute role='admin'>
            <AdminUsersPage />
          </PrivateRoute>
        } />
        <Route path="/admin-products" element={
          <PrivateRoute>
            <AdminProductsPage />
          </PrivateRoute>
        } />
        <Route path="/fav" element={
          <PrivateRoute role='user'>
            <FavPages />
          </PrivateRoute>
        } />
        <Route path="/cart" element={
          <PrivateRoute role='user'>
            <CartPage />
          </PrivateRoute>
        } />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <FooterC />
    </>
  );
};

export default RoutesViews;
