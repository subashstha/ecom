import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routeConfig";
import Home from "../pages/Home";
import About from "../pages/About";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.SHOP} element={<Shop />} />
        <Route path={ROUTES.PRODUCTSINGLE} element={<ProductSingle />} />
        <Route path={ROUTES.CATEGORY} element={<Category />} />
        <Route path={ROUTES.CATEGORYSINGLE} element={<CategorySingle />} />
        <Route path={ROUTES.BLOG} element={<Blog />} />
        <Route path={ROUTES.BLOGSINGLE} element={<BlogSingle />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
