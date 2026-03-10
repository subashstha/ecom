/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setUser(user);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        localStorage.removeItem("loggedInUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("loggedInUser", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
