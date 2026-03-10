/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import Pagetitle from "../components/sections/Pagetitle";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import ProductCounter from "../components/common/ProductCounter";
import { FiShoppingCart } from "react-icons/fi";
import { BsLightningChargeFill } from "react-icons/bs";
import RelatedProducts from "../components/sections/RelatedProducts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductSingle = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, addToCart, cart } = useContext(DataContext);

  const handleBuyNow = () => {
    const buyNowItem = {
      ...product,
      quantity: quantity,
    };

    navigate("/checkout", { state: { buyNowItem } });
  };

  const products = data?.products || [];
  if (!products.length) return <div className="loading">Loading...</div>;

  const product = products.find((p) => p.slug === slug);
  if (!product) return <div>Product not found</div>;

  const cartItem = cart.find((c) => c.id === product.id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const discountedPrice =
    product.price.original * (1 - product.price.discountPercent / 100);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);

  const sizeMap = {
    small: "S",
    medium: "M",
    large: "L",
  };

  const images = Array.isArray(product.image) ? product.image : [product.image];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Pagetitle pagetitle={{ title: product.title }} />

      <section className="product-single container mx-auto py-20">
        <div className="flex flex-wrap ">
          <div className="w-1/2 pr-20">
            <div className="border border-light rounded-lg overflow-hidden mb-5">
              <Swiper
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="mySwiper2"
              >
                {images.map((img, idx) => (
                  <SwiperSlide>
                    <img
                      key={idx}
                      src={img.src}
                      alt={img.alt}
                      className="w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={5}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              className="mySwiper"
            >
              {images.map((img, idx) => (
                <SwiperSlide className="border border-light rounded-lg overflow-hidden">
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-1/2 ">
            <div className="flex items-center justify-between flex-wrap gap-5">
              {product.rating && (
                <div className="mb-4">
                  <div className="text-primary text-lg flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => {
                      if (product.rating >= i + 1)
                        return <BsStarFill key={i} />;
                      if (product.rating >= i + 0.5)
                        return <BsStarHalf key={i} />;
                      return <BsStar key={i} />;
                    })}
                  </div>
                </div>
              )}
              {product.tags?.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 px-2 py-1 rounded text-sm capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
            <div className="font-semibold text-xl pb-8 mb-8 border-b border-b-light">
              ${discountedPrice.toFixed(2)}{" "}
              {product.price.discountPercent > 0 && (
                <>
                  <span className="line-through text-gray-400 ml-2">
                    ${product.price.original.toFixed(2)}
                  </span>
                  <span className="ml-2 text-base text-red-500 font-normal">
                    {product.price.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {product.color?.length > 0 && (
              <div className="font-semibold pb-8 mb-8 border-b border-b-light">
                <h3 className="mb-4 h4">Color:</h3>
                <ul className="flex flex-wrap gap-2 text-xs">
                  {product.color.map((color, index) => (
                    <li
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      style={{ backgroundColor: color }}
                      className="w-7 h-7 rounded-full shadow-md cursor-pointer border-4 inline-flex justify-center items-center text-white border-white"
                      title={color}
                    >
                      <FaCheck
                        className={
                          selectedColor === color ? "visible" : "invisible"
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.size?.length > 0 && (
              <div className="font-semibold pb-8 mb-8 border-b border-b-light">
                <h3 className="mb-4 h4">Size:</h3>
                <ul className="flex flex-wrap gap-2 text-lg">
                  {product.size.map((size, index) => (
                    <li
                      key={index}
                      onClick={() => handleSizeSelect(size)}
                      className={`cursor-pointer px-3 py-2 w-10 h-10 inline-flex items-center justify-center rounded border border-light shadow ${
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-black"
                      }`}
                    >
                      {sizeMap[size] || size}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ProductCounter
              quantity={quantity}
              onChange={setQuantity} // ✅ just update local state
            />
            <div className="mt-6 flex items-center gap-2">
              <button
                className="btn"
                onClick={() => {
                  addToCart(product, quantity);
                  toast.success("Added to cart");
                }}
              >
                <FiShoppingCart className="mr-2" />
                Add to cart
              </button>

              <button className="btn btn-blue" onClick={handleBuyNow}>
                <BsLightningChargeFill className="mr-2" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {product.description && (
        <section className="product-description-block [&_p]:mb-5 [&_ul]:list-disc [&_ul]:ml-5">
          <div className="container  mx-auto py-20">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </section>
      )}

      <RelatedProducts product={product} allProducts={products} />
    </>
  );
};

export default ProductSingle;
