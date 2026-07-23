import React from "react";

/**
 * Left navigation panel: topic headings (categories) each containing
 * clickable blog titles.
 */
function BlogSidebar({ categories, activeSlug, onSelect }) {
  const categoryNames = Object.keys(categories);

  return (
    <nav className="blog-sidebar">
      <h3 className="blog-sidebar-heading purple">Topics</h3>
      {categoryNames.length === 0 && (
        <p className="blog-sidebar-empty">No topics yet.</p>
      )}
      {categoryNames.map((category) => (
        <div className="blog-category" key={category}>
          <h4 className="blog-category-title">{category}</h4>
          <ul className="blog-title-list">
            {categories[category].map((blog) => (
              <li key={blog.slug}>
                <button
                  type="button"
                  className={
                    "blog-title-link" +
                    (activeSlug === blog.slug ? " active" : "")
                  }
                  onClick={() => onSelect(blog.slug)}
                >
                  {blog.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default BlogSidebar;
