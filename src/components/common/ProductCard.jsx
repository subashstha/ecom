import { Link } from "react-router-dom";
import { PiHeart } from "react-icons/pi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const handleWishlistNotification = () => {
    if (inWishlist) {
      toast.error("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } =
    useContext(DataContext);

  const handleBuyNow = () => {
    const buyNowItem = {
      ...item,
      quantity: 1,
    };

    navigate("/checkout", { state: { buyNowItem } });
  };
  const inWishlist = isInWishlist(item.id);

  const handleWishlist = () => {
    if (inWishlist) removeFromWishlist(item.id);
    else addToWishlist(item);
  };

  const { slug, title, image, rating, price } = item;
  return (
    <div className="card border border-light-gray rounded-md overflow-hidden relative group h-full flex flex-col">
      <Link
        to={`/products/${slug}`}
        className="relative overflow-hidden aspect-square"
      >
        {Array.isArray(image) && image.length > 0 && (
          <>
            {image[0] && (
              <img
                src={image[0].src}
                alt={image[0].alt}
                className="w-full h-full object-contain aspect-square p-5 pb-0"
              />
            )}
            {image[1] && (
              <img
                src={image[1].src}
                alt={image[1].alt}
                className="w-full h-full object-contain aspect-square p-5 pb-0 absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </>
        )}
      </Link>

      <div className="p-2 flex flex-col md:p-4 flex-1">
        <div className="card-body">
          <button
            onClick={() => {
              handleWishlist();
              handleWishlistNotification();
            }}
            title="Wishlist"
            className={`icons absolute top-2 cursor-pointer -right-full aspect-square w-7 md:w-10 shadow rounded-sm inline-flex items-center justify-center transition-all hover:text-white  group-hover:right-2 duration-300 ${
              inWishlist
                ? "bg-pink-300 hover:bg-pink-500"
                : "bg-white hover:bg-primary"
            }`}
          >
            <PiHeart size={18} />
          </button>
          {price.discountPercent && (
            <span className="absolute top-2 -left-full bg-red-600 text-white text-xs font-semibold px-2 md:px-4 h-7 md:h-10 inline-flex items-center rounded shadow transition-all group-hover:left-2 duration-300">
              {price.discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="product-price flex-1 flex flex-col">
          {title && (
            <h3 className="card-title text-sm h6 mb-2">
              <Link
                to={`/products/${slug}`}
                className="font-semibold hover:text-primary"
              >
                {title}
              </Link>
            </h3>
          )}
          {rating && (
            <div className="mb-2">
              <div className="text-primary flex gap-1">
                {Array.from({ length: 5 }, (_, i) => {
                  if (rating >= i + 1) return <BsStarFill key={i} />;
                  if (rating >= i + 0.5) return <BsStarHalf key={i} />;
                  return <BsStar key={i} />;
                })}
              </div>
            </div>
          )}
          {price.original && (
            <div className="flex gap-2 mb-3">
              <span className="sell-price font-semibold">
                {price.currency}
                {(
                  price.original *
                  (1 - (price.discountPercent || 0) / 100)
                ).toFixed(2)}
              </span>
              <span className="line-through">
                {price.currency}
                {price.original.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          <button
            onClick={() => {
              addToCart(item, 1, true);
              toast.success("Added to cart");
            }}
            className="btn flex-1 text-xs"
          >
            Add to Cart
          </button>
          <button
            className="btn btn-blue flex-1 text-xs"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
