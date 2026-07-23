import React, { useEffect, useState } from "react";
import { getComments, postComment } from "../../services/api";

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Comment section for a blog: lists existing comments and lets visitors add one.
 */
function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    if (!blogId) return undefined;
    getComments(blogId)
      .then((data) => {
        if (active) {
          console.log("Comments loaded:", data);
          setComments(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load comments:", err);
        if (active) setComments([]);
      });
    return () => {
      active = false;
    };
  }, [blogId]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    if (!form.name.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Name and comment are required." });
      return;
    }
    setSubmitting(true);
    try {
      console.log("Posting comment for blog:", blogId);
      const created = await postComment(blogId, form);
      console.log("Comment posted successfully:", created);
      setComments((prev) => [created, ...prev]);
      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success", text: "Comment posted!" });
    } catch (err) {
      console.error("Error posting comment:", err);
      setStatus({ type: "error", text: "Could not post comment. Try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="blog-comments">
      <h3 className="purple">Comments ({comments.length})</h3>

      <form className="blog-comment-form" onSubmit={handleSubmit}>
        <div className="blog-form-row">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email (optional)"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="message"
          placeholder="Write a comment..."
          rows={3}
          value={form.message}
          onChange={handleChange}
          required
        />
        {status.text && (
          <p className={`blog-form-status ${status.type}`}>{status.text}</p>
        )}
        <button type="submit" className="blog-submit-btn" disabled={submitting}>
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <ul className="blog-comment-list">
        {comments.map((c) => (
          <li key={c._id} className="blog-comment-item">
            <div className="blog-comment-meta">
              <strong>{c.name}</strong>
              <span>{formatDate(c.createdAt)}</span>
            </div>
            <p>{c.message}</p>
          </li>
        ))}
        {comments.length === 0 && (
          <li className="blog-comment-empty">Be the first to comment.</li>
        )}
      </ul>
    </section>
  );
}

export default Comments;
