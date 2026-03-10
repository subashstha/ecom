import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let existingData = [];
    const stored = localStorage.getItem("accountRegisterData");
    if (stored) {
      try {
        existingData = JSON.parse(stored);
        if (!Array.isArray(existingData)) existingData = [];
      } catch (err) {
        console.error("Invalid data in localStorage:", err);
        localStorage.removeItem("accountRegisterData");
      }
    }

    const emailExists = existingData.some(
      (user) => user.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (emailExists) {
      setError("email", {
        type: "manual",
        message: "Email already exists. Please use a different email.",
      });
      return;
    }

    const updatedData = [...existingData, data];
    localStorage.setItem("accountRegisterData", JSON.stringify(updatedData));

    reset();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <section className="register-block py-20">
      <div className="container max-w-180 mx-auto">
        <h1 className="h2 mb-5 text-center">Register Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item w-full mb-4">
            <label
              className="block font-medium text-gray-900 cursor-pointer mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <div className="w-full">
              <input
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "Full Name is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Min Length should be at least 3",
                  },
                })}
                id="fullName"
                placeholder="Enter your full name"
                className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150 ${
                  errors.fullName ? "ring-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.fullName && (
                <span className="text-red-500 mt-2 inline-block">
                  {errors.fullName.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-item w-full mb-4">
            <label
              className="block font-medium text-gray-900 cursor-pointer mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <div className="w-full ">
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
                className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150  ${
                  errors.email ? "ring-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 mt-2 inline-block">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-item w-full mb-4">
            <label
              className="block font-medium text-gray-900 cursor-pointer mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/,
                    message:
                      "Password must be at least 6 characters and include letters and numbers",
                  },
                })}
                id="password"
                placeholder="Enter your password"
                className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150  ${errors.password ? "ring-red-500 focus:ring-red-500" : ""}`}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <LuEyeClosed /> : <LuEye />}
              </span>
              {errors.password && (
                <span className="text-red-500 mt-2 inline-block">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-item w-full mb-4">
            <label
              className="block font-medium text-gray-900 cursor-pointer mb-2"
              htmlFor="cpassword"
            >
              Confirm Password
            </label>
            <div className="w-full relative">
              <input
                type={showCPassword ? "text" : "password"}
                {...register("cpassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    // eslint-disable-next-line react-hooks/incompatible-library
                    value === watch("password") || "Passwords do not match",
                })}
                id="cpassword"
                placeholder="Enter your Confirm Password"
                className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150  ${errors.cpassword ? "ring-red-500 focus:ring-red-500" : ""}`}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowCPassword(!showCPassword)}
              >
                {showCPassword ? <LuEyeClosed /> : <LuEye />}
              </span>
              {errors.cpassword && (
                <span className="text-red-500 mt-2 inline-block">
                  {errors.cpassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-item">
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <span className="mt-5 inline-block">
          Already have an account ?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Register;
