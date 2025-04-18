const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Dummy message database for demo purposes
let messages = [];

// Send a message
router.post("/", protect, async (req, res) => {
    const { receiverId, content } = req.body;

    if (!receiverId || !content)
        return res.status(400).json({ message: "All fields required" });

    const message = await Message.create({
        senderId: req.user._id,
        receiverId,
        content,
    });

    res.status(201).json(message);
});

// Get messages for current user
router.get("/", protect, async (req, res) => {
    const messages = await Message.find({
        $or: [{ senderId: req.user._id }, { receiverId: req.user._id }],
    }).populate("senderId receiverId", "username");

    res.json(messages);
});

// Send a message
router.post("/", (req, res) => {
    const { senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = { id: messages.length + 1, senderId, receiverId, content, timestamp: new Date() };
    messages.push(newMessage);

    return res.status(201).json({ message: "Message sent successfully", message: newMessage });
});

// Get all messages between two users
router.get("/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const userMessages = messages.filter(msg => msg.senderId === userId || msg.receiverId === userId);

    return res.status(200).json(userMessages);
});

// Delete a message
router.delete("/:id", (req, res) => {
    const messageId = parseInt(req.params.id);
    messages = messages.filter(msg => msg.id !== messageId);

    return res.status(200).json({ message: `Message ${messageId} deleted successfully` });
});

// Send a message
router.post("/", async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    if (!senderId || !receiverId || !content) return res.status(400).json({ message: "All fields required" });

    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
});

// Get all messages for a user
router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const messages = await Message.find({
        $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate("senderId receiverId", "username");

    res.json(messages);
});

module.exports = router;
