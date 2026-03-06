import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const NotFound = ({ notFound }) => {
  const { data, isLoading } = useContext(DataContext);

  if (isLoading) return <div className="loading">Loading...</div>;
  const notfoundData = notFound || data?.notFound;

  if (!notfoundData) return null;

  const { title, text } = notfoundData;

  return (
    <section className="blog-block py-20">
      <div className="container">
        {title && <h1 className="mb-5">{title}</h1>}
        {text && <div dangerouslySetInnerHTML={{ __html: text }}></div>}
        <div className="mt-7">
          <Link to="/" className="btn">
            Go Back Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
