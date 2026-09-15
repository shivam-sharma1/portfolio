import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { Link } from "react-router-dom";
import { openInquiryModal } from "../FloatingInquiry";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <p className="home-eyebrow">Software Engineer</p>
              <h1 style={{ paddingBottom: 10 }} className="heading">
                Engineering Scalable Systems with Product-Driven Thinking
              </h1>

              <h2 className="heading-name">
                I'm
                <strong className="main-name"> Shivam Sharma</strong>
              </h2>

              <p className="hero-subtext">
                I design and build reliable software platforms focused on
                architecture quality, maintainability, and measurable delivery outcomes.
              </p>

              <div className="hero-type-wrap">
                <Type />
              </div>

              <div className="hero-cta-row">
                <Link to="/expertise" className="hero-cta-primary">
                  View Expertise
                </Link>
                <button
                  type="button"
                  className="hero-cta-secondary hero-cta-button"
                  onClick={openInquiryModal}
                >
                  Raise Inquiry
                </button>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid hero-illustration"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
