/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Updated helper to format Date AND Time
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    // Formatting for Date: Mar 10, 2026
    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    // Formatting for Time: 2:30 PM
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    return `${date.toLocaleDateString(undefined, dateOptions)}, ${date.toLocaleTimeString(undefined, timeOptions)}`;
  };

  const deleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.error("Order entry deleted");
  };

  if (!orders.length) {
    return (
      <section className="order-block py-10 lg:py-20">
        <div className="container text-center mx-auto">
          <h1 className="h2 mb-4">Your order history is empty</h1>
          <Link to="/products" className="btn">
            Shop Now
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="order-block py-10 lg:py-20">
      <div className="container mx-auto">
        <h1 className="h2 mb-5 lg:mb-10 text-center tracking-normal">
          Recent Orders
        </h1>
        <div className="w-full overflow-x-auto shadow-sm rounded-lg border border-light-gray">
          <table className="table-auto w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  S.N.
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray min-w-40">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Customer Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Qty
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-b border-light-gray">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-gray">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-left whitespace-nowrap text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-left font-medium text-gray-900">
                    {order.items?.[0]?.title || "Product"}
                  </td>
                  <td className="px-6 py-4 text-left text-xs font-medium text-gray-700 whitespace-nowrap">
                    {formatDateTime(order.date || order.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500 italic">
                    {order.customer?.email || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-left text-gray-900 font-semibold">
                    $
                    {(
                      order.summary?.subtotal + (order.summary?.shipping || 0)
                    ).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">
                      x{order.items?.[0]?.quantity || 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteOrder(index)}
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
      </div>
    </section>
  );
};

export default Order;
