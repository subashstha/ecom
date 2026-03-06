import Pagetitle from "../components/sections/Pagetitle";
import Productfilter from "../components/sections/Productfilter";

const Shop = () => {
  return (
    <>
      <Pagetitle pagetitle={{ title: "Shop Page" }} />
      <Productfilter />
    </>
  );
};

export default Shop;
