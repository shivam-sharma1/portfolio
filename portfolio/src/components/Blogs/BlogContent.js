import React from "react";
import Comments from "./Comments";

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Renders a single blog's content plus its comment section.
 * Content is treated as plain text and split into paragraphs to avoid XSS.
 */
function BlogContent({ slug, blog, loading, error }) {
  if (!slug) {
    return (
      <div className="blog-content blog-placeholder">
        <h2 className="purple">Select a blog to start reading</h2>
        <p>Pick a topic and a title from the panel on the left.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="blog-content blog-skeleton-card" aria-label="Loading blog content">
        <div className="blog-skeleton-line blog-skeleton-chip" />
        <div className="blog-skeleton-line blog-skeleton-title" />
        <div className="blog-skeleton-line blog-skeleton-meta" />
        <div className="blog-skeleton-block" />
        <div className="blog-skeleton-line" />
        <div className="blog-skeleton-line blog-skeleton-line-short" />
      </div>
    );
  }

  if (error) return <div className="blog-content">{error}</div>;
  if (!blog) return null;

  const paragraphs = String(blog.content || "")
    .split(/\n{2,}/)
    .filter((p) => p.trim().length > 0);

  return (
    <article className="blog-content">
      <header className="blog-content-header">
        <span className="blog-content-category purple">{blog.category}</span>
        <h1 className="blog-content-title">{blog.title}</h1>
        <p className="blog-content-meta">
          By {blog.author} · {formatDate(blog.createdAt)}
        </p>
      </header>

      <div className="blog-content-body">
        {paragraphs.map((para, idx) => (
          <p key={idx} style={{ whiteSpace: "pre-wrap" }}>
            {para}
          </p>
        ))}
      </div>

      <Comments blogId={blog._id} />
    </article>
  );
}

export default BlogContent;
