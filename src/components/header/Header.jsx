import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import Search from "../common/Search";
import { Logo } from "./Logo";
import { CiSearch, CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import Input from "../common/Input";

const Header = () => {
  const { data } = useContext(DataContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const { menu } = data.header;

  if (!data.header) return null;

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
      <header className="py-4 md:py-5 relative z-99">
        <div className="container">
          <div className="header-holder lg:flex lg:flex-wrap lg:items-center lg:justify-between">
            <div className="text-center">
              <Logo />
            </div>
            <div className="header-menu pt-4 flex flex-wrap items-center justify-between lg:pt-0 lg:gap-8 lg:flex-1">
              <button
                className="nav-opener lg:hidden inline-flex items-center justify-center"
                onClick={() => setIsMenuOpen(true)}
              >
                <IoIosMenu size={24} />
              </button>
              <nav
                className={`${
                  isMenuOpen
                    ? "block py-5 h-screen fixed inset-0 z-99 bg-white p-5 overflow-hidden overflow-y-auto md:p-8"
                    : "hidden lg:flex lg:mx-auto"
                }`}
              >
                <div className="menu-inner pb-5 mb-5 border-b border-b-light-gray flex flex-wrap justify-between lg:hidden">
                  <Logo />
                  <button
                    className="cursor-pointer p-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TfiClose size={15} />
                  </button>
                </div>
                <div className="nav-inner">
                  <div className="lg:hidden">
                    <form action="#" className="relative">
                      <Input
                        id="mobile-search"
                        type="search"
                        placeholder="Search For Products"
                      />
                      <CiSearch
                        size={20}
                        className="absolute right-2 top-2.5"
                      />
                    </form>
                  </div>
                  <ul className="menu lg:flex lg:flex-wrap lg:gap-x-7 list-none py-5 lg:py-0">
                    {menu.map((item, index) => (
                      <li
                        key={index}
                        className="relative hover:[&_.submenu]:opacity-100 hover:[&_.submenu]:visible hover:[&_.submenu]:lg:visible hover:[&_.submenu]:translate-y-0"
                      >
                        <Link
                          to={item.url}
                          className="flex items-center gap-x-1 hover:text-primary py-2 lg:py-3 transition-color duration-300"
                          onClick={(e) => {
                            if (item.submenu) {
                              e.preventDefault();
                              setOpenMenuIndex(
                                openMenuIndex === index ? null : index,
                              );
                            }
                          }}
                        >
                          {item.name}
                          {item.submenu && <BsChevronDown />}
                        </Link>

                        {item.submenu && (
                          <ul
                            className={`
                                submenu pl-4.5 py-2 border-l-light-gray lg:absolute lg:translate-y-10 lg:-left-4 lg:bg-white lg:border lg:border-light-gray lg:p-4 flex flex-col gap-y-2 min-w-45 
                                transition-all duration-300 list-disc lg:list-none
                                ${openMenuIndex === index ? "lg:opacity-0 lg:invisible lg:flex" : "hidden lg:opacity-0 lg:invisible lg:flex"}
                              `}
                          >
                            {item.submenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subItem.url}
                                  className="hover:text-primary transition-color duration-300"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
              <div className="header-actions">
                <ul className="flex gap-x-4 lg:gap-x-5 text-xl">
                  <li className="hidden lg:flex lg:gap-y-1">
                    <button
                      className="flex flex-col justify-center items-center gap-y-1 hover:text-primary cursor-pointer transition-color duration-300"
                      onClick={handleSearchOpen}
                    >
                      <CiSearch />
                      <span className="text-[10px]">Search</span>
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/user"
                      className="flex flex-col justify-center items-center gap-y-1 hover:text-primary transition-color duration-300"
                    >
                      <CiUser />
                      <span className="hidden lg:inline-block text-[10px]">
                        Account
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user"
                      className="flex flex-col justify-center items-center gap-y-1 hover:text-primary transition-color duration-300"
                    >
                      <CiHeart />
                      <span className="hidden lg:inline-block text-[10px]">
                        Wishlist
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="flex flex-col justify-center items-center gap-y-1 hover:text-primary transition-color duration-300 relative pr-2 lg:pr-0"
                    >
                      <span className="bg-primary text-white text-[10px] w-4 h-4 inline-flex items-center justify-center rounded-full absolute right-0 -top-1">
                        3
                      </span>
                      <CiShoppingCart />
                      <span className="hidden lg:inline-block text-[10px]">
                        Your Cart
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
