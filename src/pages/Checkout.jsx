import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import Pagetitle from "../components/sections/Pagetitle";

const Checkout = () => {
  const { cart, clearCart } = useContext(DataContext);
  const location = useLocation();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const buyNowItem = location.state?.buyNowItem;
  const checkoutItems = buyNowItem ? [buyNowItem] : cart;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const subtotal = checkoutItems.reduce((acc, item) => {
    const discountedPrice =
      item.price.original * (1 - (item.price.discountPercent || 0) / 100);
    return acc + item.quantity * discountedPrice;
  }, 0);

  const shipping = subtotal > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  const onSubmit = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const finalOrder = {
      customer: formData,
      items: checkoutItems,
      summary: { subtotal, shipping, total },
      checkoutType: buyNowItem ? "Instant Buy" : "Cart Checkout",
      date: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...orders, finalOrder]));

    setOrderPlaced(true);

    if (!buyNowItem) {
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <section className="py-10 lg:py-20 text-center">
        <div className="container mx-auto">
          <div className="bg-green-50 p-10 rounded-lg inline-block border border-green-200">
            <h2 className="text-primary mb-4">Order Successful!</h2>
            <p className="mb-6 text-gray-600">
              Your items are on their way. Thank you for your purchase!
            </p>
            <Link to="/products" className="btn">
              Back to Shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <section className="py-10 lg:py-20 text-center">
        <div className="container mx-auto">
          <h1 className="h2 mb-4">Your checkout is empty</h1>
          <Link to="/products" className="btn">
            Add Some Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Pagetitle pagetitle={{ title: "Checkout" }} />
      <section className="checkout-block py-10 lg:py-20">
        <div className="container mx-auto">
          {buyNowItem && cart.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 text-sm">
              You are purchasing <strong>{buyNowItem.title}</strong>. The items
              in your main cart are safe and saved for later.
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap -mx-4"
          >
            <div className="w-full lg:w-2/3 px-4">
              <h3 className="mb-6 border-b border-b-light pb-2">
                Billing Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium" htmlFor="fullname">
                    Full Name *
                  </label>
                  <input
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
                    id="fullname"
                    className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150 ${
                      errors.fullName ? "ring-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <span className="text-red-500 mt-2 inline-block">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block mb-2 font-medium" htmlFor="email">
                    Email *
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    id="email"
                    className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150 ${
                      errors.email ? "ring-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="example@mail.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 mt-2 inline-block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block mb-2 font-medium" htmlFor="phone">
                    Phone *
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    id="phone"
                    className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150 ${
                      errors.phone ? "ring-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="+1 234 567 890"
                  />
                  {errors.phone && (
                    <span className="text-red-500 mt-2 inline-block">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium" htmlFor="address">
                    Street Address *
                  </label>
                  <input
                    {...register("address", {
                      required: "Street address is required",
                    })}
                    id="address"
                    className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150 ${
                      errors.address ? "ring-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="House number and street name"
                  />
                  {errors.address && (
                    <span className="text-red-500 mt-2 inline-block">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium" htmlFor="notes">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    {...register("notes", {
                      minLength: {
                        value: 3,
                        message: "Min Length should be atleast 3",
                      },
                    })}
                    id="notes"
                    placeholder="Enter your message"
                    className={`block min-w-0 min-h-25  overflow-y-auto w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150 resize-none ${errors.message ? "ring-red-500 focus:ring-red-500" : ""}`}
                  ></textarea>
                  {errors.notes && (
                    <span className="text-red-500 mt-2 inline-block">
                      {errors.notes.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/3 px-4 mt-10 lg:mt-0">
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg sticky top-28">
                <h3 className="h4 mb-4 border-b border-b-light pb-2">
                  Order Summary
                </h3>

                <div className="flex flex-col gap-3 mb-4">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.title} x {item.quantity}
                      </span>
                      <span className="font-medium text-gray-900">
                        {item.price.currency}
                        {(
                          item.quantity *
                          (item.price.original *
                            (1 - (item.price.discountPercent || 0) / 100))
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-t-light pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>
                      {checkoutItems[0]?.price.currency}
                      {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {checkoutItems[0]?.price.currency}
                      {shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl  border-t border-t-light pt-3 font-bold text-primary mt-4">
                    <span>Total</span>
                    <span>
                      {checkoutItems[0]?.price.currency}
                      {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn w-full mt-8 bg-primary hover:bg-primary/70 gap-4 hover:text-white flex items-center justify-center  ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
