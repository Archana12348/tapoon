// src/pages/BlogPageDummy.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BlogPageDummy = () => {
  const [blogs] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      slug: "getting-started-with-react",
      excerpt:
        "Learn the basics of React.js, a popular JavaScript library for building user interfaces...",
      image: "https://via.placeholder.com/400x250?text=React+Basics",
      author: { name: "John Doe" },
      created_at: "2025-09-15T10:00:00Z",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      slug: "mastering-tailwind-css",
      excerpt:
        "Discover how Tailwind CSS makes styling faster, responsive, and developer-friendly...",
      image: "https://via.placeholder.com/400x250?text=Tailwind+CSS",
      author: { name: "Jane Smith" },
      created_at: "2025-09-20T12:30:00Z",
    },
    {
      id: 3,
      title: "Why Use Node.js?",
      slug: "why-use-nodejs",
      excerpt:
        "Explore the advantages of using Node.js for scalable and high-performance applications...",
      image: "https://via.placeholder.com/400x250?text=Node.js",
      author: { name: "Alex Johnson" },
      created_at: "2025-09-25T14:45:00Z",
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">All Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white dark:bg-gray-800"
            >
              {/* Blog Image */}
              <Link to={`/blogs/${blog.slug}`}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
              </Link>

              <div className="p-4">
                {/* Blog Title */}
                <Link to={`/blogs/${blog.slug}`}>
                  <h3 className="text-lg font-semibold mb-2 hover:text-sky-500">
                    {blog.title}
                  </h3>
                </Link>

                {/* Blog Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Author & Date */}
                <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                  <span>By {blog.author?.name || "Unknown"}</span>
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPageDummy;
