import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { AiOutlineDelete } from "react-icons/ai";
import ProductCounter from "../components/common/ProductCounter";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, addToCart, clearCart } =
    useContext(DataContext);

  const totalCartPrice = cart.reduce((acc, item) => {
    const discountedPrice =
      item.price.original * (1 - (item.price.discountPercent || 0) / 100);
    return acc + item.quantity * discountedPrice;
  }, 0);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const allTitles = cart.map((item) => item.title).join(", ");

  if (!cart.length) {
    return (
      <section className="cart-block py-10 lg:py-20">
        <div className="container mx-auto text-center">
          <h1 className="h2 mb-4">Your cart is empty</h1>
          <Link to="/products" className="btn inline-block">
            Add Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-block py-10 lg:py-20">
      <div className="container mx-auto">
        <h1 className="h2 mb-5 lg:mb-10 text-center tracking-normal">
          Cart Items
        </h1>

        {/* Main Cart Table Card */}
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
                  Quantity
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-b border-light-gray min-w-30">
                  Total
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray">
              {cart.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 bg-white border border-light rounded p-1">
                      <img
                        src={item.image[0].src}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/products/${item.slug}`}
                      className="text-primary hover:underline font-medium text-gray-900"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {item.price.currency}
                    {(
                      item.price.original *
                      (1 - (item.price.discountPercent || 0) / 100)
                    ).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-block">
                      <ProductCounter
                        quantity={item.quantity}
                        onChange={(qty) => addToCart(item, qty, true)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900">
                    {item.price.currency}
                    {(
                      item.quantity *
                      (item.price.original *
                        (1 - (item.price.discountPercent || 0) / 100))
                    ).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.error("Removed from cart");
                      }}
                      className="text-red-500 hover:text-red-700 p-2 transition-all transform hover:scale-110"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Summary Section */}
        <div className="mt-10 flex justify-end">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm border border-light-gray">
            <h3 className="text-xl font-bold mb-4 border-b border-b-light pb-2">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Products:</span>
                <span className="text-gray-700 text-right font-medium line-clamp-1 ml-4">
                  {allTitles}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Items:</span>
                <span className="text-gray-900 font-bold">{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-primary pt-4 border-t border-t-light">
                <span>Total Amount:</span>
                <span>
                  {cart[0]?.price.currency}
                  {totalCartPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    clearCart();
                    toast.error("Cart cleared");
                  }}
                  className="btn btn-red flex-1"
                >
                  Clear All
                </button>
                <Link to="/checkout" className="btn btn-blue flex-1">
                  Checkout Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
