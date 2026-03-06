/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useRef } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const Categories = ({ categories }) => {
  const { data } = useContext(DataContext);
  const categoriesData = categories || data.categories; // top-level categories

  if (!categoriesData?.length) return null;

  const SlideRef = useRef();

  const handlePrev = () => SlideRef.current?.swiper.slidePrev();
  const handleNext = () => SlideRef.current?.swiper.slideNext();

  return (
    <section className="category-list pb-10 md:pb-20">
      <div className="container">
        {/* Section Title */}
        <div className="pr-30 md:pr-50 border-b border-b-light-gray mb-10 relative flex flex-nowrap items-center">
          <h2 className="inline-flex border-b-3 border-b-primary -mb-0.25 pb-5">
            Categories
          </h2>
          <div className="swiper-navigation absolute flex gap-4 md:gap-6 right-0">
            <div className="prev cursor-pointer" onClick={handlePrev}>
              <GoChevronLeft size={20} />
            </div>
            <div className="next cursor-pointer" onClick={handleNext}>
              <GoChevronRight size={20} />
            </div>
          </div>
        </div>

        {/* Swiper Categories */}
        <Swiper
          className="[&_.swiper-button-prev]:hidden [&_.swiper-button-next]:hidden"
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
            1440: { slidesPerView: 6, spaceBetween: 50 },
          }}
          navigation={false}
          ref={SlideRef}
          modules={[Autoplay, Navigation]}
        >
          {categoriesData.map((cat) => {
            const { id, slug, title, image } = cat;
            const src = image?.src;
            const alt = image?.alt || title;

            return (
              <SwiperSlide key={id}>
                <Link
                  to={`/category/${slug}`}
                  className="item flex flex-col items-center text-center group"
                >
                  {src && (
                    <div className="aspect-square rounded-full border border-light-gray overflow-hidden p-3 group-hover:bg-primary transition-colors">
                      <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                  )}
                  {title && (
                    <span className="block mt-3 text-xs md:text-base group-hover:text-primary transition-colors">
                      {title}
                    </span>
                  )}
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
