import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="main flex-1" id="main">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
