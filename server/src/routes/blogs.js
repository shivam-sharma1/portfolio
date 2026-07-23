const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

/**
 * GET /api/blogs
 * Returns published blogs grouped for the sidebar (id, title, slug, category).
 * Supports optional ?category= filter.
 */
router.get("/", async (req, res, next) => {
  try {
    const filter = { published: true };
    if (req.query.category) filter.category = req.query.category;

    const blogs = await Blog.find(filter)
      .select("title slug category excerpt createdAt")
      .sort({ createdAt: -1 })
      .lean();

    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/blogs/categories
 * Returns the list of distinct categories with their blog titles for the
 * left navigation panel.
 */
router.get("/categories", async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true })
      .select("title slug category createdAt")
      .sort({ category: 1, createdAt: -1 })
      .lean();

    const grouped = blogs.reduce((acc, blog) => {
      (acc[blog.category] = acc[blog.category] || []).push({
        title: blog.title,
        slug: blog.slug,
      });
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/blogs/:slug
 * Returns a single published blog by its slug.
 */
router.get("/:slug", async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true }).lean();
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
