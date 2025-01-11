const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/blogController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/", getPosts);
router.put("/:id", authMiddleware, upload.single("image"), updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
