/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import ProductCard from "../common/ProductCard";

const Product = ({ products }) => {
  const { data } = useContext(DataContext);
  const productData = products || data.sections?.product;
  if (!productData) return null;

  const { title } = productData;

  const uniqueTags = [
    ...new Set(data.products?.flatMap((item) => item.tags) || []),
  ];

  const [activeTag, setActiveTag] = useState("all");

  const allProduct = data.products;

  const filteredProducts =
    activeTag === "all"
      ? allProduct
      : allProduct.filter((item) => item.tags.includes(activeTag));

  return (
    <>
      <section className="product-block pt-10 pb-16 md:pb-30">
        <div className="container">
          <div className="mb-10">
            {title && (
              <div className="pr-30 md:pr-50 border-b border-b-light-gray mb-10 relative flex flex-nowrap">
                <h2 className="inline-flex border-b border-b-3 border-b-primary -mb-0.25 pb-5">
                  {title}
                </h2>
              </div>
            )}

            {uniqueTags.length > 0 && (
              <div className="w-full mx-auto mb-6">
                <ul className="flex justify-center items-center gap-1 md:gap-4 flex-wrap">
                  <li>
                    <button
                      className={`py-1.5 px-3 md:py-2 md:px-4 font-medium capitalize rounded cursor-pointer ${
                        activeTag === "all"
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                      }`}
                      onClick={() => setActiveTag("all")}
                    >
                      All
                    </button>
                  </li>
                  {uniqueTags.map((tag, index) => (
                    <li key={index}>
                      <button
                        className={`py-1.5 px-3 md:py-2 md:px-4 font-medium capitalize rounded cursor-pointer ${
                          activeTag === tag
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-primary hover:text-white transition-colors"
                        }`}
                        onClick={() => setActiveTag(tag)}
                      >
                        {tag}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="flex flex-wrap -mx-2 md:-mx-3 -mb-4 md:-mb-6">
              {filteredProducts.slice(0, 8).map((item) => {
                const { id } = item;
                return (
                  <div
                    className="w-1/2 px-2 md:px-3 md:w-1/3 xl:w-1/4 pb-4 md:pb-6"
                    key={id}
                  >
                    <ProductCard item={item} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500">No products found</div>
          )}

          <div className="text-center mt-8 md:mt-15">
            <Link to="/products" className="btn">
              View All
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
