const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    // Email is optional and never displayed publicly.
    email: { type: String, trim: true, lowercase: true, maxlength: 200, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
