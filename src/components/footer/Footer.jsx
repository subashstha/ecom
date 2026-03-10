import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Logo } from "../footer/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const { data } = useContext(DataContext);
  const footerData = data.footer;
  if (!footerData) return null;

  const { address, phone, email, menus, copyright } = footerData;

  return (
    <>
      <footer className="footer bg-off-white">
        <div className="container">
          <div className="footer-holder md:flex md:flex-wrap py-10 md:-mx-5">
            <div className="footer-col pb-5 md:w-2/5 md:px-5">
              <Logo />
              <ul className="flex flex-col gap-2 md:gap-4">
                <li>
                  {address && (
                    <address
                      className="not-italic mt-5"
                      dangerouslySetInnerHTML={{ __html: address }}
                    />
                  )}
                </li>
                <li>
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="h3 hover:text-primary"
                    >
                      {phone}
                    </a>
                  )}
                </li>
                <li>
                  {email && (
                    <a href={`mailto:${email}`} className="hover:text-primary">
                      {email}
                    </a>
                  )}
                </li>
              </ul>
            </div>
            <div className="md:w-3/5 flex flex-wrap -mx-2 -mb-5 md:mx-0">
              {menus &&
                menus.map((menuItem, index) => (
                  <div
                    className="footer-col w-1/2 lg:flex-1 px-2 pb-5 md:px-5"
                    key={index}
                  >
                    {menuItem.title && (
                      <span className="h4 block">{menuItem.title}</span>
                    )}

                    <ul className="flex flex-col gap-2">
                      {menuItem.menu?.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.url}
                            className="hover:text-primary transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {copyright && (
          <div className="text-center py-5 text-white bg-black">
            <div
              className="[&_a]:hover:text-primary"
              dangerouslySetInnerHTML={{ __html: copyright }}
            ></div>
          </div>
        )}
      </footer>
    </>
  );
};

export default Footer;
