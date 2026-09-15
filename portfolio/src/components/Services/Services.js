import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const expertiseList = [
  {
    title: "Software Design and Development",
    description:
      "Custom web platforms, internal tools, and APIs built with maintainable architecture and clean delivery milestones.",
  },
  {
    title: "Software and Network Architecture",
    description:
      "System decomposition, API contracts, integration strategy, and resilient infrastructure patterns for growth-ready systems.",
  },
  {
    title: "Product and UX Design",
    description:
      "Product discovery, interaction flows, wireframes, and practical UX improvements aligned with measurable business outcomes.",
  },
  {
    title: "Development and Deployment",
    description:
      "CI/CD workflows, cloud deployment setup, release hardening, and production readiness for confident go-lives.",
  },
  {
    title: "Maintenance and Observability",
    description:
      "Reliability improvements, actionable monitoring, tracing, alerting, and performance optimization to reduce incidents.",
  },
  {
    title: "Software Consultation",
    description:
      "Architecture reviews, roadmap planning, technical due diligence, and strategic guidance for product and engineering leaders.",
  },
  {
    title: "Performance and Reliability Engineering",
    description:
      "Bottleneck analysis, latency optimization, fault tolerance, and stability improvements for production systems.",
  },
  {
    title: "Security and Quality Engineering",
    description:
      "Secure coding practices, test strategy, and release quality controls integrated into development workflows.",
  },
];

const process = [
  "Discovery workshop and scope clarity",
  "Architecture and solution blueprint",
  "Iterative build in transparent milestones",
  "Release, monitoring, and long-term support",
];

function Expertise() {
  return (
    <Container fluid className="services-section">
      <Particle />
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="services-hero">
              <p className="services-eyebrow">Core Expertise</p>
              <h1 className="project-heading">
                Software Engineering and Architecture Expertise
              </h1>
              <p className="services-intro">
                Professional focus across product engineering, architecture, and
                operational excellence for modern software systems.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="service-grid-row">
          {expertiseList.map((item) => (
            <Col md={6} lg={4} key={item.title} className="service-card-wrap">
              <article className="service-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </Col>
          ))}
        </Row>

        <Row className="service-extra-row">
          <Col md={6} className="service-panel-wrap">
            <div className="service-panel">
              <h3>Engineering Workflow</h3>
              <ul className="service-checklist">
                {process.map((item) => (
                  <li key={item}>
                    <FiCheckCircle />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={6} className="service-panel-wrap">
            <div className="service-panel">
              <h3>Key Outcomes</h3>
              <ul className="service-checklist">
                <li>
                  <FiCheckCircle />
                  <span>Faster product delivery with clearer priorities</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Reduced technical debt and better system clarity</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Improved uptime, observability, and release confidence</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Stronger product experience for users and stakeholders</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <div className="services-cta-strip">
          <p>
            Looking for architecture review or engineering collaboration?
          </p>
          <a href="#contact" className="services-cta-link">
            Start a Conversation <FiArrowRight />
          </a>
        </div>
      </Container>
    </Container>
  );
}

export default Expertise;
