import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import BlogSidebar from "./BlogSidebar";
import BlogContent from "./BlogContent";
import { getBlogCategories } from "../../services/api";

function Blogs() {
  const [categories, setCategories] = useState({});
  const [activeSlug, setActiveSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    getBlogCategories()
      .then((data) => {
        if (!active) return;

        const normalized = data || {};
        setCategories(normalized);

        const firstCategory = Object.keys(normalized)[0];
        const firstBlog = firstCategory ? normalized[firstCategory]?.[0] : null;

        setActiveSlug((currentSlug) => {
          if (currentSlug) {
            const hasCurrentSlug = Object.values(normalized).some((items = []) =>
              items.some((blog) => blog.slug === currentSlug)
            );
            if (hasCurrentSlug) return currentSlug;
          }
          return firstBlog ? firstBlog.slug : "";
        });
      })
      .catch(() => active && setError("Could not load blogs."))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  const hasBlogs = Object.keys(categories).length > 0;

  return (
    <Container fluid className="blog-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Blogs</strong>
        </h1>
        <p style={{ color: "white" }}>Thoughts on science, technology and more.</p>

        {loading && !error && !hasBlogs && <p style={{ color: "white" }}>Loading blogs...</p>}
        {error && <p style={{ color: "white" }}>{error}</p>}

        {!loading && !error && !hasBlogs && (
          <p style={{ color: "white" }}>No blogs published yet.</p>
        )}

        <Row className="blog-layout">
          <Col md={3} className="blog-sidebar-col">
            <BlogSidebar
              categories={categories}
              activeSlug={activeSlug}
              onSelect={setActiveSlug}
            />
          </Col>
          <Col md={9} className="blog-content-col">
            <BlogContent slug={activeSlug} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Blogs;
