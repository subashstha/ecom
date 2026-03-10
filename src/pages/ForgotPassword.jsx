import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleEmailSubmit = async (data) => {
    const existingUsers =
      JSON.parse(localStorage.getItem("accountRegisterData")) || [];

    const user = existingUsers.find(
      (user) => user.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (!user) {
      setError("email", { type: "manual", message: "Email not found" });
      return;
    }

    setEmail(data.email);
    setStep(2);
    reset();
  };

  const handlePasswordReset = async (data) => {
    const existingUsers =
      JSON.parse(localStorage.getItem("accountRegisterData")) || [];

    const updatedUsers = existingUsers.map((user) => {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return { ...user, password: data.password };
      }
      return user;
    });

    localStorage.setItem("accountRegisterData", JSON.stringify(updatedUsers));
    reset();
    setSubmitted(true);

    setTimeout(() => navigate("/signin"), 2000);
  };

  return (
    <section className="register-block py-20">
      <div className="container max-w-180 mx-auto">
        <h1 className="h2 mb-5 text-center">Forgot Password</h1>

        {step === 1 && (
          <form onSubmit={handleSubmit(handleEmailSubmit)}>
            <div className="form-item w-full mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-900 mb-2"
              >
                Enter your registered email
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                className={`block w-full rounded-md ring-1 ring-gray-300 py-2.5 px-3.5 placeholder:text-gray-400 focus:ring-primary transition-all duration-150 ${
                  errors.email ? "ring-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 mt-2 inline-block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(handlePasswordReset)}>
            {submitted && (
              <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-center">
                Password successfully updated!
              </div>
            )}

            {/* New Password */}
            <div className="form-item w-full mb-4 relative">
              <label htmlFor="password" className="block font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/,
                      message:
                        "Password must be at least 6 characters and include letters and numbers",
                    },
                  })}
                  className={`block w-full rounded-md ring-1 ring-gray-300 py-2.5 px-3.5 placeholder:text-gray-400 focus:ring-primary transition-all duration-150 ${
                    errors.password ? "ring-red-500 focus:ring-red-500" : ""
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
                <span className="text-red-500 mt-2 inline-block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-item w-full mb-4 relative">
              <label htmlFor="cpassword" className="block font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="cpassword"
                  type={showCPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("cpassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className={`block w-full rounded-md ring-1 ring-gray-300 py-2.5 px-3.5 placeholder:text-gray-400 focus:ring-primary transition-all duration-150 ${
                    errors.cpassword ? "ring-red-500 focus:ring-red-500" : ""
                  }`}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  {showCPassword ? <LuEyeClosed /> : <LuEye />}
                </span>
              </div>
              {errors.cpassword && (
                <span className="text-red-500 mt-2 inline-block">
                  {errors.cpassword.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        <div className="flex mt-5 justify-between flex-wrap items-start gap-2">
          <Link to="/login" className="text-primary font-semibold">
            Back to Login
          </Link>
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
