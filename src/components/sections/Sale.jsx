import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import SaleCard from "../common/SaleCard";

const Sale = ({ sale }) => {
  const { data } = useContext(DataContext);
  const saleData = sale || data.sections?.sale;
  if (!saleData) return null;

  return (
    <>
      <div className="sale-block py-16 lg:py-25">
        <div className="container">
          <div className="-mb-5 md:flex md:flex-wrap md:-mx-5">
            {saleData.map((item) => {
              const { id } = item;
              return (
                <div className="md:w-1/2 md:px-5 pb-5" key={id}>
                  <SaleCard item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sale;
