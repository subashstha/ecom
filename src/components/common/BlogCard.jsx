import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";

const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

const BlogCard = ({ item }) => {
  const { title, image, date } = item;
  const slug = generateSlug(title);

  return (
    <Link
      to={`/blog/${slug}`}
      className="blog-card flex flex-col shadow h-full rounded-lg overflow-hidden relative z-1 group"
    >
      <div className="blog-img overflow-hidden aspect-[200/120]">
        {image?.src && (
          <img
            src={image.src}
            alt={image.alt || "Image Description"}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        )}
      </div>

      <div className="p-3 md:p-5 flex-1 flex flex-col items-start">
        {date && (
          <span className="text-xs flex items-center gap-1 mb-3">
            <CiCalendar />
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}

        {title && (
          <h2 className="flex-1 mb-3 text-sm group-hover:text-primary transition-colors">
            {title}
          </h2>
        )}

        <span className="btn btn-small">Read More</span>
      </div>
    </Link>
  );
};

export default BlogCard;
