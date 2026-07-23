const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

const router = express.Router();

// Limit comment creation to protect against spam/abuse.
const commentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * GET /api/comments/:blogId
 * Returns approved comments for a given blog (email is never exposed).
 */
router.get("/:blogId", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.blogId)) {
      return res.status(400).json({ error: "Invalid blog id" });
    }

    const comments = await Comment.find({ blog: req.params.blogId, approved: true })
      .select("name message createdAt")
      .sort({ createdAt: -1 })
      .lean();

    res.json(comments);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/comments/:blogId
 * Creates a new comment on a blog.
 */
router.post("/:blogId", commentLimiter, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.blogId)) {
      return res.status(400).json({ error: "Invalid blog id" });
    }

    const blogExists = await Blog.exists({ _id: req.params.blogId });
    if (!blogExists) return res.status(404).json({ error: "Blog not found" });

    const { name, email, message } = req.body || {};
    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    const comment = await Comment.create({
      blog: req.params.blogId,
      name,
      email,
      message,
    });

    res.status(201).json({
      _id: comment._id,
      name: comment.name,
      message: comment.message,
      createdAt: comment.createdAt,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
