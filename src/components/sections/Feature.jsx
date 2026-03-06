import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const Feature = ({ feature }) => {
  const { data } = useContext(DataContext);
  const featureData = feature || data.sections?.feature;
  if (!featureData) return null;

  return (
    <section className="feature-block relative overflow-hidden">
      <div className="container">
        <div className="border border-light-gray rounded-lg p-5 pb-0 md:pt-10 md:pb-5 md:flex md:flex-wrap lg:px-2 xl:px-5">
          {featureData &&
            featureData.map((item, index) => {
              const { title, text, icon } = item;
              return (
                <div
                  className="md:w-1/2 lg:w-1/4 md:px-5 lg:px-2 pb-5 xl:px-5"
                  key={index}
                >
                  <div className="feature-item flex items-center">
                    {icon && (
                      <div className="w-10 md:w-12">
                        <img
                          src={icon.src}
                          className="w-full h-full object-contain"
                          alt={icon.alt}
                        />
                      </div>
                    )}
                    <div className="flex-1 pl-5 lg:pl-3">
                      {title && <h4 className="mb-1">{title}</h4>}
                      {text && <p>{text}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Feature;
