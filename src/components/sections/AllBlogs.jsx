import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import BlogCard from "../common/BlogCard";

const AllBlogs = () => {
  const { data } = useContext(DataContext);
  const blogData = data?.blogs;
  if (!blogData?.length) return null;

  return (
    <section className="blog-block py-20 overflow-hidden">
      <div className="container">
        <div className="pr-30 md:pr-50 border-b border-b-light-gray mb-10 relative flex flex-nowrap">
          <h2 className="inline-flex border-b border-b-3 border-b-primary -mb-0.25 pb-5">
            All Blogs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogData.map((item) => (
            <div key={item.id} className="h-full pb-1">
              <BlogCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllBlogs;
