const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    // URL-friendly unique identifier, e.g. "why-i-love-react"
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // Topic heading shown in the left navigation, e.g. "Science", "Technology"
    category: { type: String, required: true, trim: true, index: true },
    // Short summary shown in listings (optional)
    excerpt: { type: String, trim: true, default: "" },
    // Full blog body. Stored as Markdown or HTML string.
    content: { type: String, required: true },
    author: { type: String, trim: true, default: "Shivam Sharma" },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
