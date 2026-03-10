import { HiOutlineEnvelope } from "react-icons/hi2";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DataContext } from "../../context/DataContext";

const Newsletter = ({ newsletter }) => {
  const { data } = useContext(DataContext);
  const newsletterData = newsletter || data.sections?.newsletter;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  if (!newsletterData) return null;
  const { title, btn } = newsletterData;

  const onSubmit = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const existingEmails =
      JSON.parse(localStorage.getItem("newsletterEmails")) || [];
    localStorage.setItem(
      "newsletterEmails",
      JSON.stringify([...existingEmails, formData]),
    );

    toast.success("Subscribed successfully!");
    reset();
  };

  return (
    <section className="news-letter bg-black text-white py-10">
      <div className="container">
        <div className="md:flex md:flex-wrap items-center">
          {title && (
            <h2 className="text-white flex gap-2 md:flex-1 md:items-center md:mb-0 leading-none mb-4">
              <HiOutlineEnvelope className="text-2xl" />
              {title}
            </h2>
          )}

          <div className="md:flex-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full h-[42px] bg-white text-black rounded-md px-4 outline-none transition-all ${
                    errors.email
                      ? "ring-2 ring-red-500"
                      : "focus:ring-2 focus:ring-primary"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {btn?.text && (
                <button
                  type="submit"
                  className="btn h-[42px] px-6 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : btn.text}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
