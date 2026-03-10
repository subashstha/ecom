import { useState } from "react";
import { useForm } from "react-hook-form";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const existingData =
      JSON.parse(localStorage.getItem("contactFormData")) || [];

    const updatedData = [...existingData, data];

    localStorage.setItem("contactFormData", JSON.stringify(updatedData));

    reset();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="contact-block py-20">
      <div className="container max-w-180 mx-auto">
        <h1 className="h2 mb-5 text-center">Contact Form</h1>
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
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                id="email"
                placeholder="Enter your email"
                className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150  ${errors.email ? "ring-red-500 focus:ring-red-500" : ""}`}
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
              htmlFor="subject"
            >
              Subject
            </label>
            <div className="w-full ">
              <input
                {...register("subject", {
                  required: {
                    value: true,
                    message: "Subject is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Min Length should be atleast 3",
                  },
                })}
                id="subject"
                placeholder="Enter subject here"
                className={`block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150  ${errors.subject ? "ring-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.subject && (
                <span className="text-red-500 mt-2 inline-block">
                  {errors.subject.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-item w-full mb-4">
            <label
              className="block font-medium text-gray-900 cursor-pointer mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <div className="w-full">
              <textarea
                {...register("message", {
                  minLength: {
                    value: 3,
                    message: "Min Length should be atleast 3",
                  },
                })}
                id="message"
                placeholder="Enter your message"
                className={`block min-w-0 min-h-25  overflow-y-auto w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150 resize-none ${errors.message ? "ring-red-500 focus:ring-red-500" : ""}`}
              ></textarea>
              {errors.message && (
                <span className="text-red-500 mt-2 inline-block">
                  {errors.message.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-item">
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        {submitted && (
          <div className="mt-4 p-3 rounded bg-green-100 text-green-700 text-center">
            Form submitted successfully!
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
