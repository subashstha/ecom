import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Pagetitle from "../components/sections/Pagetitle";
import { CiCalendar } from "react-icons/ci";

const generateSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

const BlogSingle = () => {
  const { slug } = useParams();
  const { data } = useContext(DataContext);
  const blogs = data?.blogs || [];

  if (!blogs.length) return <div className="loading">Loading...</div>;

  const blog = blogs.find((p) => generateSlug(p.title) === slug);

  if (!blog)
    return (
      <div className="container py-20 mx-auto">
        <h2>Blog not found</h2>
      </div>
    );

  return (
    <>
      <Pagetitle pagetitle={{ title: blog.title }} />

      <section className="blog-single container mx-auto py-20">
        {blog.date && (
          <span className="text-xs flex items-center gap-1 mb-4">
            <CiCalendar />
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
        {blog.image?.src && (
          <img
            src={blog.image.src}
            alt={blog.image.alt || blog.title}
            className="w-full max-h-96 object-cover rounded-lg mb-6"
          />
        )}

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />
      </section>
    </>
  );
};

export default BlogSingle;
