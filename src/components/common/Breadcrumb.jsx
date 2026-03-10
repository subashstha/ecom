import { Link, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <ul className="breadcrumb flex flex-wrap justify-center gap-2">
      <li className="breadcrumb-item">
        <Link to="/" className="text-primary">
          Home
        </Link>
      </li>

      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = "/" + pathnames.slice(0, index + 1).join("/");

        return (
          <li
            key={index}
            className="breadcrumb-item flex text-left items-center gap-2 capitalize text-primary"
          >
            <FaAngleRight />

            {isLast ? (
              <span>{value.replace(/-/g, " ")}</span>
            ) : (
              <Link to={to} className="text-primary">
                {value.replace(/-/g, " ")}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumb;
