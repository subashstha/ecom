/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ProductCard from "../common/ProductCard";
import { Link } from "react-router-dom";

const RelatedProducts = ({ product, allProducts }) => {
  if (!product || !allProducts?.length) return null;

  const relatedProducts = allProducts.filter(
    (p) =>
      p.id !== product.id && p.tags?.some((tag) => product.tags.includes(tag)),
  );

  if (!relatedProducts.length) return null;

  const slideRef = useRef();

  const handlePrev = () => slideRef.current.swiper.slidePrev();
  const handleNext = () => slideRef.current.swiper.slideNext();

  return (
    <section className="related-products-block py-16 md:py-30">
      <div className="container">
        <div className="pr-30 md:pr-50 border-b border-b-light-gray mb-10 relative flex flex-nowrap">
          <h2 className="inline-flex border-b border-b-3 border-b-primary -mb-0.25 pb-5">
            Related Products
          </h2>
          <div className="swiper-navigation gap-4 md:gap-6 absolute flex justify-between items-center right-0">
            <div className="prev cursor-pointer" onClick={handlePrev}>
              <GoChevronLeft size={20} />
            </div>
            <div className="next cursor-pointer" onClick={handleNext}>
              <GoChevronRight size={20} />
            </div>
          </div>
        </div>

        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 24 },
            1440: { slidesPerView: 4, spaceBetween: 30 },
          }}
          navigation={false}
          ref={slideRef}
          modules={[Autoplay, Navigation]}
        >
          {relatedProducts.slice(0, 8).map((item) => (
            <SwiperSlide key={item.id} className="h-auto!">
              <div className="h-full">
                <ProductCard item={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8 md:mt-15">
          <Link to="/products" className="btn">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
