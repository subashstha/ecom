import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Breadcrumb from "../common/Breadcrumb";

const Pagetitle = ({ pagetitle = {} }) => {
  const { data } = useContext(DataContext);

  const defaultData = data.sections?.pagetitle || {};
  const pagetitleData = { ...defaultData, ...pagetitle };

  const { image, title } = pagetitleData;

  if (!image && !title) return null;

  return (
    <section className="breadcrumb-main relative overflow-hidden text-center py-20">
      {image && (
        <div className="bg absolute -z-1 inset-0">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="container">
        <div className="breadcrumb-container">
          {title && <h1 className="page-title h2">{title}</h1>}
          <Breadcrumb />
        </div>
      </div>
    </section>
  );
};

export default Pagetitle;
