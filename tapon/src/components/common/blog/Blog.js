// src/pages/BlogDetailDummy.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const BlogDetailDummy = () => {
  const { slug } = useParams();

  // Dummy blog data
  const dummyBlog = {
    id: 1,
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    excerpt:
      "Learn the basics of React.js, a popular JavaScript library for building user interfaces.",
    body: `
      <p>React is a JavaScript library for building user interfaces. It lets you create reusable UI components.</p>
      <p>With React, you can build dynamic and fast web applications.</p>
      <h3>Why React?</h3>
      <ul>
        <li>Reusable Components</li>
        <li>Virtual DOM</li>
        <li>Strong Community</li>
      </ul>
    `,
    image: "https://via.placeholder.com/800x400?text=React+Blog",
    author: { name: "John Doe" },
    created_at: "2025-09-15T10:00:00Z",
    meta_description: "Learn React basics and why it's popular.",
    meta_keywords: "React, JavaScript, UI, Frontend",
  };

  // Dummy comments
  const [comments, setComments] = useState([
    {
      id: 1,
      subject: "Great Post!",
      body: "This article helped me understand React much better. Thanks!",
    },
    {
      id: 2,
      subject: "",
      body: "Looking forward to more blogs like this.",
    },
  ]);

  // Comment form state
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.message) {
      alert("Please fill required fields.");
      return;
    }

    // Add comment locally
    const newComment = {
      id: Date.now(),
      subject: commentForm.subject,
      body: commentForm.message,
    };
    setComments((prev) => [newComment, ...prev]);

    // Reset form
    setCommentForm({ name: "", email: "", subject: "", message: "" });
  };

  if (!dummyBlog) return <div className="p-6 text-center">No blog found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Back button */}
      <Link to="/blogs" className="inline-block mb-4 text-sm underline">
        ← Back
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-2">{dummyBlog.title}</h1>

      {/* Excerpt */}
      {dummyBlog.excerpt && (
        <p className="text-gray-600 italic mb-4">{dummyBlog.excerpt}</p>
      )}

      {/* Main image */}
      {dummyBlog.image && (
        <img
          src={dummyBlog.image}
          alt={dummyBlog.title}
          className="w-full h-auto mb-6 object-cover rounded"
        />
      )}

      {/* Meta info */}
      <div className="text-sm text-gray-500 mb-6">
        <span>By {dummyBlog.author?.name || "Unknown"}</span> ·{" "}
        <span>{new Date(dummyBlog.created_at).toLocaleDateString()}</span>
      </div>

      {/* Full Body Content */}
      <div
        className="prose max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: dummyBlog.body || "" }}
      />

      {/* Extra Meta */}
      <div className="mt-8 text-sm text-gray-500">
        {dummyBlog.meta_description && (
          <p>
            <strong>Meta Description:</strong> {dummyBlog.meta_description}
          </p>
        )}
        {dummyBlog.meta_keywords && (
          <p>
            <strong>Meta Keywords:</strong> {dummyBlog.meta_keywords}
          </p>
        )}
      </div>

      {/* ---------------- COMMENT SECTION ---------------- */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-bold mb-4">Leave a Comment</h2>

        <form onSubmit={handlePostComment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={commentForm.name}
              onChange={handleInputChange}
              placeholder="Name *"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={commentForm.email}
              onChange={handleInputChange}
              placeholder="Email *"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            value={commentForm.subject}
            onChange={handleInputChange}
            placeholder="Subject (optional)"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            value={commentForm.message}
            onChange={handleInputChange}
            placeholder="Message"
            rows="5"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Post Comment
          </button>
        </form>

        {/* Comment List */}
        <div className="mt-8">
          <h3 className="font-bold mb-2">({comments.length}) Comments</h3>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((c) => (
                <li key={c.id} className="border p-3 rounded">
                  {c.subject && (
                    <p className="text-sm italic">Subject: {c.subject}</p>
                  )}
                  <p className="mt-2">{c.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* ------------------------------------------------- */}
    </div>
  );
};

export default BlogDetailDummy;
