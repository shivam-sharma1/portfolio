import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/myImg.jpeg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              Professional <span className="purple">Skillset</span>
            </h1>
            <p className="home-about-body">
              I build robust software systems with a strong focus on architecture,
              code quality, and operational reliability.
              <br />
              <br />Core strengths include
              <i>
                <b className="purple"> JavaScript, TypeScript, Node.js, React, Java, Python, SQL, and cloud-native engineering </b>
              </i>
              across modern product and platform teams.
              <br />
              <br />I regularly work on
              <i>
                <b className="purple">
                  software architecture, distributed systems, API design,
                  CI/CD, infrastructure automation, and observability.
                </b>
              </i>
              <br />
              <br />
              Current focus areas also include performance optimization,
              security-by-design, testing strategy, and engineering productivity.
            </p>

            <div className="credibility-grid">
              <div className="credibility-item">
                <h3>End-to-End Delivery</h3>
                <p>Architecture, implementation, release, and operational stability.</p>
              </div>
              <div className="credibility-item">
                <h3>Architecture Depth</h3>
                <p>API-first systems, distributed patterns, and cloud-native design.</p>
              </div>
              <div className="credibility-item">
                <h3>Engineering Rigor</h3>
                <p>Testing, observability, and maintainable long-term codebases.</p>
              </div>
            </div>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg}  style={{ borderRadius: "50%", width: "300px", height: "300px"}} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
