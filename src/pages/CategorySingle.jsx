import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import ProductCard from "../components/common/ProductCard";

const CategorySingle = () => {
  const { slug } = useParams();
  const { data } = useContext(DataContext);
  const products = data?.products || [];

  if (!products.length) return <div className="loading">Loading...</div>;

  const categoryProducts = products.filter(
    (p) => Array.isArray(p.categories) && p.categories.includes(slug),
  );

  const categoryTitle = slug.charAt(0).toUpperCase() + slug.slice(1);

  if (!categoryProducts.length)
    return (
      <>
        <div className="py-10 lg:py-20">
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 tracking-normal">
              No products found in this category :{" "}
              <span className="text-primary">{categoryTitle}</span>
            </h1>
          </div>
        </div>
      </>
    );

  return (
    <section className="category-single container mx-auto py-10 lg:py-20">
      <h2 className="text-3xl font-semibold mb-10">
        Category : {categoryTitle}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/products" className="btn">
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default CategorySingle;
