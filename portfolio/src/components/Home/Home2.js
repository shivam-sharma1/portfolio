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
              Modern <span className="purple">Engineering Approach</span>
            </h1>
            <p className="home-about-body">
              I build production-grade software systems combining specialized expertise,
              rigorous engineering practices, and AI-augmented development for rapid, high-quality delivery.
              <br />
              <br />Core strengths include
              <i>
                <b className="purple"> JavaScript, TypeScript, Node.js, React, Java, Python, SQL, and cloud-native systems </b>
              </i>
              with hands-on experience in high-impact product and platform teams.
              <br />
              <br />I specialize in
              <i>
                <b className="purple">
                  end-to-end delivery, API architecture, distributed systems, CI/CD automation,
                  production observability, and performance optimization.
                </b>
              </i>
              <br />
              <br />
              Current work emphasizes rapid iteration cycles, security-by-design,
              quality assurance automation, and engineering efficiency without compromising standards.
            </p>

            <div className="credibility-grid">
              <div className="credibility-item">
                <h3>Rapid Quality Delivery</h3>
                <p>Architecture-first, iterative execution from concept through production with measurable outcomes.</p>
              </div>
              <div className="credibility-item">
                <h3>Modern Systems Design</h3>
                <p>Distributed-first, API-native, cloud-optimized architectures built for scale and reliability.</p>
              </div>
              <div className="credibility-item">
                <h3>Production Excellence</h3>
                <p>Observability, automated testing, deployment hardening, and operational sustainability.</p>
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
