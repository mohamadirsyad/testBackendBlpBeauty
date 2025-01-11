import React, { useState, useEffect } from "react";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleCreateOrUpdatePost = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu");
      return;
    }

    const url = editMode
      ? `http://localhost:5000/api/blogs/${editId}`
      : "http://localhost:5000/api/blogs";

    const method = editMode ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      setTitle("");
      setContent("");
      setImage(null);
      setEditMode(false);
      setIsModalOpen(false);
    } else {
      alert("Gagal menyimpan blog");
    }
  };

  const handleDeletePost = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      alert("Gagal menghapus blog");
    }
  };

  const openEditModal = (post) => {
    setEditMode(true);
    setEditId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setImage(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <button
        onClick={() => {
          setEditMode(false);
          setTitle("");
          setContent("");
          setImage(null);
          setIsModalOpen(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Tambah Blog
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Blog" : "Tambah Blog"}
            </h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul blog"
            />
            <textarea
              className="w-full p-2 border rounded mb-4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Masukkan konten blog"
            />
            <input
              type="file"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              onClick={handleCreateOrUpdatePost}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Simpan
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Blog Saya</h2>
        {posts.map((post) => (
          <div key={post.id} className="border-b mb-4 pb-4">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            {post.imageUrl && (
              <img
                src={`http://localhost:5000/${post.imageUrl}`}
                alt={post.title}
                className="mt-4 w-64 h-auto"
              />
            )}
            <div className="mt-4">
              <button
                onClick={() => openEditModal(post)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
