import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(DataContext);

  if (!wishlist.length) {
    return (
      <section className="wishlist-block py-10 lg:py-20">
        <div className="container text-center mx-auto">
          <h1 className="h2 mb-4">Your wishlist is empty</h1>
          <Link to="/products" className="btn inline-block">
            Add Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-block py-10 lg:py-20">
      <div className="container mx-auto">
        <h1 className="h2 mb-5 lg:mb-10 text-center tracking-normal">
          Wishlist Items
        </h1>

        {/* Added Shadow, Rounded Corners, and Border */}
        <div className="w-full overflow-x-auto shadow-sm rounded-lg border border-light-gray bg-white">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  S.N.
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray min-w-40">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray">
              {wishlist.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-left text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-left">
                    <div className="wishlist-img w-16 h-16 bg-white border border-light rounded p-1">
                      <img
                        src={item.image[0].src}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <Link
                      to={`/products/${item.slug}`}
                      className="text-primary hover:underline font-medium text-gray-900"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-left">
                    {item.price.original && (
                      <div className="flex flex-col sm:flex-row sm:gap-2 items-start sm:items-center">
                        <span className="text-gray-900 font-bold">
                          {item.price.currency}
                          {(
                            item.price.original *
                            (1 - (item.price.discountPercent || 0) / 100)
                          ).toFixed(2)}
                        </span>
                        <span className="line-through text-gray-400 text-sm">
                          {item.price.currency}
                          {item.price.original.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        removeFromWishlist(item.id);
                        toast.error("Removed from wishlist");
                      }}
                      className="text-red-500 hover:text-red-700 p-2 transition-all transform hover:scale-110"
                      title="Remove Item"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right pt-5 flex gap-3 justify-end">
          <button
            onClick={() => {
              clearWishlist();
              toast.error("Wishlist cleared");
            }}
            className="btn btn-red "
          >
            Clear All
          </button>
          <Link to="/cart" className="btn">
            Go To Cart
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
