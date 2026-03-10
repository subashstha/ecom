/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const DataContext = createContext({
  data: null,
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  isInCart: () => false,
  clearCart: () => {},
});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("/data/mock.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  // DataContext.jsx

  const addToCart = (item, qty = 1, setExact = false) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((c) => c.id === item.id);

      if (existingItemIndex !== -1) {
        const newCart = [...prevCart];
        const updatedItem = { ...newCart[existingItemIndex] };

        if (setExact) {
          // Used by ProductCounter in Cart.jsx to set a specific number
          updatedItem.quantity = qty;
        } else {
          // Used by Add to Cart button to add to what's already there
          updatedItem.quantity += qty;
        }

        newCart[existingItemIndex] = updatedItem;
        return newCart;
      } else {
        // First time adding the item
        return [...prevCart, { ...item, quantity: qty }];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const clearCart = () => {
    setCart([]);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : isError || !data ? (
        <div className="loading">Error loading data</div>
      ) : (
        children
      )}
    </DataContext.Provider>
  );
};
