import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { openInquiryModal } from "../FloatingInquiry";

const expertiseList = [
  {
    title: "Custom Software Development",
    description:
      "Modern, maintainable platforms and APIs delivered in rapid iteration cycles. Direct collaboration, clear milestones, and outcome-focused delivery without corporate overhead.",
  },
  {
    title: "System Architecture & Design",
    description:
      "Efficient, scalable system decomposition. API-first design, resilience patterns, and cloud-native architecture that supports growth without rework.",
  },
  {
    title: "AI-Augmented Development",
    description:
      "Leverage modern AI tools for faster iteration and higher code quality. Specialized engineering expertise ensures AI outputs remain production-grade and maintainable.",
  },
  {
    title: "Performance & Reliability",
    description:
      "Identify and eliminate bottlenecks. Optimize latency, throughput, and system resilience. Reduce incidents through proactive observability and automation.",
  },
  {
    title: "Production Operations & Monitoring",
    description:
      "Implement observability-first practices. Structured logging, metrics, tracing, and alerting that enable fast incident response and continuous improvement.",
  },
  {
    title: "Technical Strategy & Guidance",
    description:
      "Architecture reviews, roadmap planning, and engineering leadership support. Help product and engineering teams make high-impact technical decisions quickly.",
  },
  {
    title: "Quality & Automation",
    description:
      "End-to-end test strategy, CI/CD optimization, and release hardening. High code quality with fast feedback loops and confident deployments.",
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "AWS deployment, Kubernetes orchestration, IaC, and automated scaling. Modern infrastructure that supports rapid delivery and operational simplicity.",
  },
];

const process = [
  "Clear scope and architecture blueprint",
  "Iterative development with transparent milestones",
  "Continuous quality assurance and testing",
  "Production release, monitoring, and support",
];

function Expertise() {
  return (
    <Container fluid className="services-section">
      <Particle />
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="services-hero">
              <p className="services-eyebrow">Specialized Engineering</p>
              <h1 className="project-heading">
                Modern Software Engineering at Speed
              </h1>
              <p className="services-intro">
                Direct engagement with a specialized engineer. Rapid delivery, production-grade quality,
                modern stack, and competitive costs—without traditional consulting overhead.
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

        <Row className="service-panel-row">
          <Col md={6} className="service-panel-wrap">
            <div className="service-panel">
              <h3>Why This Approach Works</h3>
              <ul className="service-checklist">
                <li>
                  <FiCheckCircle />
                  <span>Direct collaboration: No layers, no delays, no corporate processes</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Modern stack with AI-augmented tools for faster iteration</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Production-grade quality through rigorous engineering practices</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Specialized expertise: No generalists, only deep technical knowledge</span>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={6} className="service-panel-wrap">
            <div className="service-panel">
              <h3>Expected Outcomes</h3>
              <ul className="service-checklist">
                <li>
                  <FiCheckCircle />
                  <span>Faster time-to-market with clear technical milestones</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Reduced technical debt and production incidents</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Systems optimized for scale, reliability, and maintainability</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Competitive cost structure with enterprise-grade quality</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <Row className="service-extra-row">
          <Col md={6} className="service-panel-wrap">
            <div className="service-panel">
              <h3>How I Work</h3>
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
              <h3>Why Choose Direct Engagement</h3>
              <ul className="service-checklist">
                <li>
                  <FiCheckCircle />
                  <span>No account managers or middlemen—you work directly with the engineer</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Faster decisions and rapid problem-solving</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Transparent pricing without corporate markup</span>
                </li>
                <li>
                  <FiCheckCircle />
                  <span>Custom solutions tailored to your specific needs</span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <div className="services-cta-strip">
          <p>
            Ready to build something great with direct collaboration and modern engineering?
          </p>
          <button
            type="button"
            className="services-cta-link services-cta-button"
            onClick={openInquiryModal}
          >
            Start a Conversation <FiArrowRight />
          </button>
        </div>
      </Container>
    </Container>
  );
}

export default Expertise;
