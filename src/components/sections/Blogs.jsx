/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useRef } from "react";
import { DataContext } from "../../context/DataContext";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import BlogCard from "../common/BlogCard";
import { Link } from "react-router-dom";

const Blogs = ({ blog }) => {
  const { data } = useContext(DataContext);
  const blogData = blog || data.sections?.blog;
  if (!blogData) return null;

  const { title } = blogData;

  const latestBlogs = data.blogs
    ?.slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  const SlideRef = useRef();

  const handlePrev = () => {
    SlideRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    SlideRef.current.swiper.slideNext();
  };

  return (
    <>
      <section className="blog-block pb-16 md:pb-20 overflow-hidden">
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
            spaceBetween={12}
            slidesPerView={1.5}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={false}
            breakpoints={{
              768: { slidesPerView: 3, spaceBetween: 24 },
            }}
            ref={SlideRef}
            modules={[Autoplay, Pagination, Navigation]}
            className="md:px-0.5! overflow-visible! md:overflow-hidden!"
          >
            {latestBlogs.map((item) => {
              const { id } = item;
              return (
                <SwiperSlide key={id} className="h-auto!">
                  <div key={id} className="h-full pb-1">
                    <BlogCard item={item} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="text-center mt-5 md:mt-15">
            <Link to="/blog" className="btn">
              View All
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
