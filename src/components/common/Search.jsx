import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Search = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
    onClose();
  };

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
                  className="search-close cursor-pointer p-2 rounded-sm ring-1 ring-primary hover:bg-primary transition-color duration-300 hover:text-white"
                  onClick={onClose}
                >
                  <TfiClose size={15} />
                </button>
              </div>
              <form onSubmit={handleSearch}>
                <div className="form-item w-full">
                  <label
                    htmlFor="search"
                    className="block font-medium text-gray-900 cursor-pointer mb-2"
                  >
                    Search Product
                  </label>
                  <div className="w-full">
                    <input
                      ref={inputRef}
                      id="search"
                      name="search"
                      type="search"
                      placeholder="Search For Products"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="block min-w-0 w-full bg-white rounded-md ring-1 ring-gray-300 grow py-2.5 px-3.5 outline-none placeholder:text-gray-400 focus:outline-none focus:ring-primary transition-all duration-150"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
