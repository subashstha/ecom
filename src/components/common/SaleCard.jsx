import { Link } from "react-router-dom";

const SaleCard = ({ item }) => {
  const { subtitle, title, image, button } = item;
  return (
    <>
      <div className="sale-card rounded-md md:rounded-lg overflow-hidden relative z-1">
        {image.src && (
          <img
            src={image.src}
            alt={image.alt || "Image Description"}
            className="absolute inset-0 -z-1 object-cover w-full h-full"
          />
        )}
        <div className="sale-body lg:min-h-60 xl:min-h-90 flex flex-col justify-center items-start p-4 py-6 md:p-5 xl:p-10">
          {subtitle && (
            <span className="uppercase font-medium md:text-lg block mb-3">
              {subtitle}
            </span>
          )}
          {title && <h2 className="mb-3">{title}</h2>}
          {button?.text && button?.url && (
            <Link to={button.url} className="btn">
              {button.text}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default SaleCard;
