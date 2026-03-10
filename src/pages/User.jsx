/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [loginDate, setLoginDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dateStr = localStorage.getItem("loggedInUserDate");
    if (dateStr) setLoginDate(new Date(dateStr).toLocaleString());
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("loggedInUserDate");
    navigate("/logout");
  };

  return (
    <section className="user-block py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-5">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <h2 className="font-semibold">{user.fullName}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        {loginDate && (
          <p className="my-4 text-gray-600 text-sm">Last login: {loginDate}</p>
        )}
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>
    </section>
  );
};

export default UserProfile;
