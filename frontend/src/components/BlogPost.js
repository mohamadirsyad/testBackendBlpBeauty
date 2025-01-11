import React from "react";

const BlogPost = ({ title, content }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2">{content}</p>
    </div>
  );
};

export default BlogPost;
