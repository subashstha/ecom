import Banner from "../components/sections/Banner";
import Sale from "../components/sections/Sale";
import Categories from "../components/sections/Categories";
import Product from "../components/sections/Product";
import Feature from "../components/sections/Feature";
import Blogs from "../components/sections/Blogs";
import NewArrival from "../components/sections/NewArrival";
import Newsletter from "../components/sections/Newsletter";

const Home = () => {
  return (
    <>
      <Banner />
      <Sale />
      <Categories />
      <Product />
      <Feature />
      <NewArrival />
      <Blogs />
      <Newsletter />
    </>
  );
};

export default Home;
