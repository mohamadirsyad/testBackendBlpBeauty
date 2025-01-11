const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file?.path || null;
    const userId = req.user.id;

    const post = await prisma.post.create({
      data: { title, content, imageUrl, userId },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: { user: true } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const imageUrl = req.file?.path || null;
    const userId = req.user.id;

    const post = await prisma.post.updateMany({
      where: { id: Number(id), userId }, // Hanya pengguna yang memiliki post dapat mengeditnya
      data: { title, content, imageUrl },
    });

    if (post.count === 0) {
      return res.status(404).json({
        error: "Blog tidak ditemukan atau Anda tidak memiliki akses.",
      });
    }

    res.json({ message: "Blog berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ error: "Gagal memperbarui blog" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.deleteMany({
      where: { id: Number(id), userId }, // Hanya pengguna yang memiliki post dapat menghapusnya
    });

    if (post.count === 0) {
      return res.status(404).json({
        error: "Blog tidak ditemukan atau Anda tidak memiliki akses.",
      });
    }

    res.json({ message: "Blog berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus blog" });
  }
};
