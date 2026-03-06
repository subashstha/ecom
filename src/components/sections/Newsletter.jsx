import { HiOutlineEnvelope } from "react-icons/hi2";
import Input from "../common/Input";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const Newsletter = ({ newsletter }) => {
  const { data } = useContext(DataContext);
  const newsletterData = newsletter || data.sections?.newsletter;
  if (!newsletterData) return null;

  const { title, btn } = newsletterData;

  return (
    <>
      <section className="news-letter bg-black text-white py-10">
        <div className="container">
          <div className="md:flex md:flex-wrap">
            {title && (
              <h2 className="text-white flex gap-2 md:flex-1 md:items-start md:mb-0 leading-none">
                <HiOutlineEnvelope />
                {title}
              </h2>
            )}
            <form
              action="#"
              className="flex flex-col md:flex-1 md:flex-row gap-2 md:items-center"
            >
              <Input
                id="newsletter"
                type="email"
                placeholder="Enter your new address"
              />
              {btn.text && (
                <button type="submit" className="btn h-[42px]">
                  {btn.text}
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
