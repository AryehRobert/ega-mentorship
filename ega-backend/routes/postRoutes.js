const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Dummy post database for demo purposes
let posts = [];



// Create Post
router.post("/", async (req, res) => {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) return res.status(400).json({ message: "All fields required" });

    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
});

// Get all posts
router.get("/", async (req, res) => {
    const posts = await Post.find().populate("userId", "username email");
    res.json(posts);
});

// Delete a post
router.delete("/:id", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
});

// Create a new post
router.post("/", (req, res) => {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = { id: posts.length + 1, title, content, userId };
    posts.push(newPost);

    return res.status(201).json({ message: "Post created successfully", post: newPost });
});

// Get all posts
router.get("/", (req, res) => {
    return res.status(200).json(posts);
});

// Delete a post
router.delete("/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== postId);

    return res.status(200).json({ message: `Post ${postId} deleted successfully` });
});

router.post("/", protect, async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) return res.status(400).json({ message: "All fields required" });

    const post = await Post.create({
        title,
        content,
        userId: req.user._id,
    });

    res.status(201).json(post);
});
module.exports = router;
