import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routeConfig";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/Layout";
import Shop from "../pages/Shop";
import ProductSingle from "../pages/ProductSingle";
import CategorySingle from "../pages/CategorySingle";
import Category from "../pages/Category";
import Blog from "../pages/Blog";
import BlogSingle from "../pages/BlogSingle";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import User from "../pages/User";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import SearchResult from "../pages/SearchResult";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/cart";
import Checkout from "../pages/Checkout";
import Order from "../pages/Order";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SHOP} element={<Shop />} />
        <Route path={ROUTES.PRODUCTSINGLE} element={<ProductSingle />} />
        <Route path={ROUTES.CATEGORY} element={<Category />} />
        <Route path={ROUTES.CATEGORYSINGLE} element={<CategorySingle />} />
        <Route path={ROUTES.BLOG} element={<Blog />} />
        <Route path={ROUTES.BLOGSINGLE} element={<BlogSingle />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.RESETPASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.SEARCH} element={<SearchResult />} />

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.USER} element={<User />} />
          <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTES.ORDER} element={<Order />} />
        </Route>

        <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
