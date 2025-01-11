import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.log("Error fetching blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleCreatePost = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">BlogPage</h1>
      <button
        onClick={handleCreatePost}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
      >
        Buat Blog
      </button>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Daftar Blog</h2>
        {blogs.length > 0 ? (
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id} className="mb-4 p-4 border rounded">
                <h1>By : {blog.user.name}</h1>
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p>{blog.content}</p>
                {blog.imageUrl && (
                  <img
                    src={`http://localhost:5000/${blog.imageUrl}`}
                    alt={blog.title}
                    className="mt-4 w-32 h-auto"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada blog untuk ditampilkan.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
