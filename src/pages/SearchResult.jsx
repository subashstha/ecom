import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const SearchResult = () => {
  const { data } = useContext(DataContext);
  const products = data?.products || [];

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = products.filter((product) =>
    product.title.toLowerCase().includes(query),
  );

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-6">
          <h2 className="mb-10 ">Search Results for: "{query}"</h2>
          {results.length === 0 && <p>No products found.</p>}
        </div>

        <div className="flex flex-wrap -mx-2 md:-mx-3 -mb-4 md:-mb-6">
          {results.map((product) => {
            const { id, image, title, slug, rating, price } = product;

            return (
              <div
                className="w-1/2 px-2 md:px-3 md:w-1/3 xl:w-1/4 pb-4 md:pb-6"
                key={id}
              >
                <div
                  key={product.id}
                  className="card border border-light-gray rounded-md overflow-hidden relative group h-full flex flex-col"
                >
                  <Link
                    to={`/products/${slug}`}
                    className="relative overflow-hidden aspect-square"
                  >
                    {Array.isArray(image) && image.length > 0 && (
                      <>
                        {image[0] && (
                          <img
                            src={image[0].src}
                            alt={image[0].alt}
                            className="w-full h-full object-contain aspect-square p-5 pb-0"
                          />
                        )}

                        {image[1] && (
                          <img
                            src={image[1].src}
                            alt={image[1].alt}
                            className="w-full h-full object-contain aspect-square p-5 pb-0 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        )}
                      </>
                    )}
                  </Link>

                  <div className="p-2 flex flex-col md:p-4 flex-1">
                    <div className="card-body">
                      {price?.discountPercent && (
                        <span className="absolute top-2 bg-red-600 text-white text-xs font-semibold px-2 md:px-4 h-7 md:h-10 inline-flex items-center rounded shadow">
                          {price.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    <div className="product-price flex-1 flex flex-col">
                      {title && (
                        <h3 className="text-sm mb-2">
                          <Link
                            to={`/products/${slug}`}
                            className="font-semibold hover:text-primary"
                          >
                            {title}
                          </Link>
                        </h3>
                      )}

                      {rating && (
                        <div className="mb-2 text-primary flex gap-1">
                          {Array.from({ length: 5 }, (_, i) => {
                            if (rating >= i + 1) return <BsStarFill key={i} />;
                            if (rating >= i + 0.5)
                              return <BsStarHalf key={i} />;
                            return <BsStar key={i} />;
                          })}
                        </div>
                      )}

                      {price?.original && (
                        <div className="flex gap-2 mb-3">
                          <span className="font-semibold">
                            {price.currency}
                            {(
                              price.original *
                              (1 - (price.discountPercent || 0) / 100)
                            ).toFixed(2)}
                          </span>

                          <span className="line-through">
                            {price.currency}
                            {price.original.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-2">
                      <Link to="/cart" className="btn flex-1 text-xs">
                        Add to Cart
                      </Link>

                      <Link
                        to="/checkout"
                        className="btn flex-1 btn-secondary text-xs"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="btn">
            View All Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
