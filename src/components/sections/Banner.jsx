import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Autoplay, Navigation } from "swiper/modules";

const Banner = ({ banner }) => {
  const { data } = useContext(DataContext);

  const bannerData = banner || data.sections?.banner;

  if (!bannerData) return null;

  return (
    <section className="banner-section bg-light-sand relative py-10">
      <Swiper
        className="pb-16! lg:pb-0!"
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        modules={[Autoplay, Navigation]}
      >
        {bannerData.map((item) => {
          const { id, badge, title, img, button } = item;

          return (
            <SwiperSlide key={id}>
              <div className="container mx-auto">
                <div className="banner-item md:pt-10 lg:px-10 md:flex md:flex-row-reverse md:items-center md:gap-10 lg:py-10">
                  {img?.src && (
                    <div className="md:w-1/3 mb-10 w-2/3 mx-auto">
                      <img src={img.src} alt={img.alt || "Image Description"} />
                    </div>
                  )}
                  <div className="md:flex-1 text-left">
                    {badge && (
                      <span className="mb-3 inline-block uppercase font-semibold">
                        {badge}
                      </span>
                    )}
                    {title && (
                      <h2 className="max-w-80 uppercase mb-5 font-bold">
                        {title}
                      </h2>
                    )}
                    {button?.text && button?.url && (
                      <Link to={button.url} className="btn">
                        {button.text}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="pagination absolute bottom-0 flex items-center gap-5 left-1/2 -translate-x-1/2 lg:static lg:translate-none">
          <div className="prev lg:-translate-y-1/2 lg:absolute lg:left-3 2xl:left-10">
            <GoChevronLeft size={20} />
          </div>
          <div className="next lg:-translate-y-1/2 lg:absolute lg:right-3 2xl:right-10">
            <GoChevronRight size={20} />
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default Banner;
