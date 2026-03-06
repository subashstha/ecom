import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

export const Logo = () => {
  const { data } = useContext(DataContext);
  const logo = data?.footer?.logo;

  if (!logo?.url) return null;

  return (
    <div className="header-logo inline-flex md:min-w-40">
      <Link to={logo.url} className="inline-flex w-15 md:w-20 items-center">
        {logo.src && <img src={logo.src} alt={logo.alt || "Logo"} />}
      </Link>
    </div>
  );
};
