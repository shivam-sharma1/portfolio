import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import BlogSidebar from "./BlogSidebar";
import BlogContent from "./BlogContent";
import { getBlogBootstrap, getBlogBySlug } from "../../services/api";

function Blogs() {
  const [categories, setCategories] = useState({});
  const [activeSlug, setActiveSlug] = useState("");
<<<<<<< Updated upstream
=======
  const [activeBlog, setActiveBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingBlog, setLoadingBlog] = useState(false);
>>>>>>> Stashed changes
  const [error, setError] = useState("");
  const blogCacheRef = useRef({});

  useEffect(() => {
    let active = true;
<<<<<<< Updated upstream
    getBlogCategories()
      .then((data) => {
        if (!active) return;
        setCategories(data);
        // Auto-select the first available blog.
        const firstCategory = Object.keys(data)[0];
        if (firstCategory && data[firstCategory][0]) {
          setActiveSlug(data[firstCategory][0].slug);
=======

    setLoading(true);
    setError("");

    getBlogBootstrap()
      .then((data) => {
        if (!active) return;

        const normalized = data?.categories || {};
        const initialBlog = data?.initialBlog || null;

        setCategories(normalized);
        setActiveBlog(initialBlog);

        if (initialBlog?.slug) {
          setActiveSlug(initialBlog.slug);
          blogCacheRef.current = { [initialBlog.slug]: initialBlog };
        } else {
          setActiveSlug("");
          blogCacheRef.current = {};
>>>>>>> Stashed changes
        }
      })
      .catch(() => active && setError("Could not load blogs."));
    return () => {
      active = false;
    };
  }, []);

<<<<<<< Updated upstream
=======
  useEffect(() => {
    let active = true;

    if (!activeSlug) {
      setActiveBlog(null);
      setLoadingBlog(false);
      return undefined;
    }

    if (activeBlog && activeBlog.slug === activeSlug) {
      setLoadingBlog(false);
      return undefined;
    }

    const cachedBlog = blogCacheRef.current[activeSlug];
    if (cachedBlog) {
      setActiveBlog(cachedBlog);
      setLoadingBlog(false);
      return undefined;
    }

    setLoadingBlog(true);
    setError("");

    getBlogBySlug(activeSlug)
      .then((data) => {
        if (!active) return;
        setActiveBlog(data);
        blogCacheRef.current = { ...blogCacheRef.current, [activeSlug]: data };
      })
      .catch(() => active && setError("Could not load this blog."))
      .finally(() => active && setLoadingBlog(false));

    return () => {
      active = false;
    };
  }, [activeSlug, activeBlog]);

  const hasBlogs = Object.keys(categories).length > 0;

  const renderInitialSkeleton = () => (
    <Row className="blog-layout blog-layout-loading" aria-label="Loading blogs">
      <Col md={3} className="blog-sidebar-col">
        <div className="blog-sidebar blog-skeleton-card">
          <div className="blog-skeleton-line blog-skeleton-heading" />
          <div className="blog-skeleton-line blog-skeleton-subheading" />
          <div className="blog-skeleton-line" />
          <div className="blog-skeleton-line blog-skeleton-line-short" />
          <div className="blog-skeleton-line blog-skeleton-subheading" />
          <div className="blog-skeleton-line" />
        </div>
      </Col>
      <Col md={9} className="blog-content-col">
        <div className="blog-content blog-skeleton-card">
          <div className="blog-skeleton-line blog-skeleton-chip" />
          <div className="blog-skeleton-line blog-skeleton-title" />
          <div className="blog-skeleton-line blog-skeleton-meta" />
          <div className="blog-skeleton-block" />
          <div className="blog-skeleton-line" />
          <div className="blog-skeleton-line blog-skeleton-line-short" />
        </div>
      </Col>
    </Row>
  );

>>>>>>> Stashed changes
  return (
    <Container fluid className="blog-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Blogs</strong>
        </h1>
        <p style={{ color: "white" }}>Thoughts on science, technology and more.</p>

<<<<<<< Updated upstream
        {error && <p style={{ color: "white" }}>{error}</p>}

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
=======
        {error && !loading && <p style={{ color: "white" }}>{error}</p>}
        {loading && !error && renderInitialSkeleton()}

        {!loading && !error && !hasBlogs && (
          <p style={{ color: "white" }}>No blogs published yet.</p>
        )}

        {!loading && hasBlogs && (
          <Row className="blog-layout">
            <Col md={3} className="blog-sidebar-col">
              <BlogSidebar
                categories={categories}
                activeSlug={activeSlug}
                onSelect={setActiveSlug}
              />
            </Col>
            <Col md={9} className="blog-content-col">
              <BlogContent
                slug={activeSlug}
                blog={activeBlog}
                loading={loadingBlog}
                error={error}
              />
            </Col>
          </Row>
        )}
>>>>>>> Stashed changes
      </Container>
    </Container>
  );
}

export default Blogs;
