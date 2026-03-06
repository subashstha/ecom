/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useRef } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const NewArrival = ({ newarrival }) => {
  const { data } = useContext(DataContext);
  const newarrivalData = newarrival || data.sections?.newarrival;
  if (!newarrivalData) return null;

  const { title } = newarrivalData;

  const allProduct = data.products;

  const newArrivalProducts = allProduct.filter((item) =>
    item.tags.includes("new arrival"),
  );

  const SlideRef = useRef();

  const handlePrev = () => {
    SlideRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    SlideRef.current.swiper.slideNext();
  };

  return (
    <>
      <section className="newarivals-block py-16 md:py-30">
        <div className="container">
          {title && (
            <div className="pr-30 md:pr-50 border-b border-b-light-gray mb-10 relative flex flex-nowrap">
              <h2 className="inline-flex border-b border-b-3 border-b-primary -mb-0.25 pb-5">
                {title}
              </h2>
              <div className="swiper-navigation gap-4 md:gap-6 absolute flex justify-between items-center right-0">
                <div className="prev" onClick={handlePrev}>
                  <GoChevronLeft size={20} />
                </div>
                <div className="next" onClick={handleNext}>
                  <GoChevronRight size={20} />
                </div>
              </div>
            </div>
          )}

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
            ref={SlideRef}
            modules={[Autoplay, Navigation]}
          >
            {newArrivalProducts.slice(0, 8).map((item) => {
              const { id } = item;
              return (
                <SwiperSlide key={id} className="h-auto!">
                  <div key={id} className="h-full">
                    <ProductCard item={item} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="text-center mt-8 md:mt-15">
            <Link to="/products" className="btn">
              View All
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewArrival;
