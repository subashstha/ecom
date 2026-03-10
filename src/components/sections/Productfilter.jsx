/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useState, useMemo, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { BsStar, BsStarFill } from "react-icons/bs";
import PriceSlider from "../common/PriceSlider";
import CheckboxGroup from "../common/CheckboxGroup";
import ProductCard from "../common/ProductCard";
import SelectDropdown from "../common/SelectDropdown";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const ProductFilter = () => {
  const [values, setValues] = useState([5, 80]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;
  const ratings = [5, 4, 3, 2, 1];

  const sortOptions = [
    { label: "Low to High", value: "low-high" },
    { label: "High to Low", value: "high-low" },
    { label: "Release Date", value: "release-date" },
    { label: "By Rating", value: "by-rating" },
  ];

  const { data } = useContext(DataContext);
  const allProducts = data?.products || [];

  const colors = useMemo(() => {
    const allColors = allProducts.flatMap((p) => p.color || []);
    return [...new Set(allColors)].filter(Boolean);
  }, [allProducts]);

  const sizes = useMemo(() => {
    const allSizes = allProducts.flatMap((p) => p.size || []);
    return [...new Set(allSizes)].filter(Boolean);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      const discountedPrice =
        product.price.original * (1 - product.price.discountPercent / 100);
      const price = discountedPrice;

      const minPrice = values[0];
      const maxPrice = values[1];

      const inPriceRange = price >= minPrice && price <= maxPrice;

      const inColor = selectedColors.length
        ? (Array.isArray(product.color) ? product.color : [product.color]).some(
            (c) => selectedColors.includes(c),
          )
        : true;
      const inSize = selectedSizes.length
        ? (Array.isArray(product.size) ? product.size : [product.size]).some(
            (c) => selectedSizes.includes(c),
          )
        : true;

      const inRating = selectedRatings.length
        ? selectedRatings.some((r) => product.rating >= r)
        : true;

      return inPriceRange && inColor && inSize && inRating;
    });

    if (sort === "low-high")
      result.sort(
        (a, b) =>
          a.price.original * (1 - a.price.discountPercent / 100) -
          b.price.original * (1 - b.price.discountPercent / 100),
      );
    else if (sort === "high-low")
      result.sort(
        (a, b) =>
          b.price.original * (1 - b.price.discountPercent / 100) -
          a.price.original * (1 - a.price.discountPercent / 100),
      );
    else if (sort === "by-rating") result.sort((a, b) => b.rating - a.rating);
    else if (sort === "release-date")
      result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

    return result;
  }, [
    allProducts,
    values,
    selectedColors,
    selectedSizes,
    selectedRatings,
    sort,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [values, selectedColors, selectedSizes, selectedRatings, sort]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  return (
    <section className="product-filter py-20">
      <div className="container">
        <div className="holder flex flex-wrap lg:flex-nowrap">
          <aside className="aside w-full lg:w-1/5 pr-0 lg:pr-10 border-r border-r-light mb-8 lg:mb-0">
            <div className="aside-body space-y-6">
              <PriceSlider
                values={values}
                setValues={setValues}
                min={0}
                max={100}
                step={10}
              />

              <CheckboxGroup
                label="Color"
                options={colors}
                selectedValues={selectedColors}
                setSelectedValues={setSelectedColors}
              />

              <CheckboxGroup
                label="Size"
                options={sizes}
                selectedValues={selectedSizes}
                setSelectedValues={setSelectedSizes}
              />

              <CheckboxGroup
                label="Rating"
                options={ratings}
                selectedValues={selectedRatings}
                setSelectedValues={setSelectedRatings}
                renderLabel={(rating) => (
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < rating ? <BsStarFill key={i} /> : <BsStar key={i} />,
                    )}
                  </div>
                )}
              />
            </div>
          </aside>

          <div className="w-full lg:w-4/5 pl-0 lg:pl-10">
            <div className="flex flex-wrap gap-3 mb-6">
              <SelectDropdown
                options={sortOptions}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                placeholder="Sort by"
              />
            </div>

            {filteredProducts.length > 0 ? (
              <div className="flex flex-wrap -mx-2 md:-mx-3 -mb-4 md:-mb-6">
                {currentProducts.map((item) => (
                  <div
                    className="w-1/2 px-2 md:px-3 md:w-1/3 pb-4 md:pb-6"
                    key={item.id}
                  >
                    <ProductCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">No products found</div>
            )}

            {totalPages > 1 && (
              <div className="pagination-main gap-4 rounded-md bg-off-white p-5 mt-10 flex flex-wrap w-full justify-between items-center">
                <div className="pagination_result">
                  Showing page {currentPage} of {totalPages} (
                  {filteredProducts.length} Products)
                </div>

                <ul className="pagination flex flex-wrap gap-2">
                  <li>
                    <button
                      className={`w-9 h-9 inline-flex items-center justify-center rounded-full transition-all font-medium text-xl ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-white hover:bg-primary hover:text-white"
                      }`}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <MdOutlineKeyboardArrowLeft />
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <li key={i}>
                        <button
                          className={`w-9 h-9 inline-flex items-center justify-center rounded-full transition-all font-medium ${
                            currentPage === pageNum
                              ? "bg-primary text-white"
                              : "bg-white hover:bg-primary hover:text-white"
                          }`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  })}

                  <li>
                    <button
                      className={`w-9 h-9 inline-flex items-center justify-center rounded-full transition-all font-medium text-xl ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-white hover:bg-primary hover:text-white"
                      }`}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <MdOutlineKeyboardArrowRight />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFilter;
