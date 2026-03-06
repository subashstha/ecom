import { TfiClose } from "react-icons/tfi";
import Input from "./Input";

const Search = ({ isOpen, onClose }) => {
  return (
    <>
      <div className="relative z-99">
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
            isOpen ? "opacity-40" : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        ></div>
        <div
          className={`fixed inset-x-0 top-0 bg-white transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="bg-white py-15">
            <div className="container">
              <div className="text-end mb-5">
                <button
                  className="search-close cursor-pointer p-2 rounded-sm ring-1 ring-primary hover:bg-primary transition-color duration-300"
                  onClick={onClose}
                >
                  <TfiClose size={15} />
                </button>
              </div>
              <form action="#">
                <Input
                  label="Search"
                  id="product-search"
                  type="search"
                  placeholder="Search For Products"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
