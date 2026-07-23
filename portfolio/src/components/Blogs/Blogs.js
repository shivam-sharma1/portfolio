import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import BlogSidebar from "./BlogSidebar";
import BlogContent from "./BlogContent";
import { getBlogCategories } from "../../services/api";

function Blogs() {
  const [categories, setCategories] = useState({});
  const [activeSlug, setActiveSlug] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getBlogCategories()
      .then((data) => {
        if (!active) return;
        setCategories(data);
        // Auto-select the first available blog.
        const firstCategory = Object.keys(data)[0];
        if (firstCategory && data[firstCategory][0]) {
          setActiveSlug(data[firstCategory][0].slug);
        }
      })
      .catch(() => active && setError("Could not load blogs."));
    return () => {
      active = false;
    };
  }, []);

  return (
    <Container fluid className="blog-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Blogs</strong>
        </h1>
        <p style={{ color: "white" }}>Thoughts on science, technology and more.</p>

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
      </Container>
    </Container>
  );
}

export default Blogs;
