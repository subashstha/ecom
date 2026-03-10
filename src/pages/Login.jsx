import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, user, logout } = useAuth(); // <-- use auth

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUsers =
      JSON.parse(localStorage.getItem("accountRegisterData")) || [];

    const user = existingUsers.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (!user) {
      setError("email", { type: "manual", message: "Email not found" });
      return;
    }

    if (user.password !== data.password) {
      setError("password", { type: "manual", message: "Incorrect password" });
      return;
    }

    login(user);
    localStorage.setItem("loggedInUserDate", new Date().toISOString());
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("loggedInUserDate");
    navigate("/login");
  };

  return (
    <section className="register-block py-20">
      <div className="container max-w-180 mx-auto">
        {user ? (
          <div className="text-center">
            <h1 className="h2 mb-5 text-center">Already Logged In</h1>
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          </div>
        ) : (
          <>
            <h1 className="h2 mb-5 text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="form-item w-full mb-4">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  id="email"
                  placeholder="Enter your email"
                  className={`block w-full py-2.5 px-3.5 rounded-md ring-1 ring-gray-300 ${
                    errors.email
                      ? "ring-red-500 focus:ring-red-500"
                      : "focus:ring-primary"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-item w-full mb-4 relative">
                <label htmlFor="password" className="block mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    id="password"
                    placeholder="Enter your password"
                    className={`block w-full py-2.5 px-3.5 rounded-md ring-1 ring-gray-300 ${
                      errors.password
                        ? "ring-red-500 focus:ring-red-500"
                        : "focus:ring-primary"
                    }`}
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <LuEyeClosed /> : <LuEye />}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="flex mt-5 justify-between flex-wrap items-start gap-2">
              <span>
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-semibold">
                  Register
                </Link>
              </span>
              <Link to="/forgotPassword" className="text-primary font-semibold">
                Forgot password?
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Login;
