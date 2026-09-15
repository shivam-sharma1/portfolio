import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  const sectionStyle = {
    marginBottom: "1.2rem",
    padding: "0.9rem 1rem",
    borderLeft: "2px solid rgba(123, 93, 255, 0.8)",
    background: "rgba(148, 120, 255, 0.03)",
    borderRadius: "8px",
  };

  const miniTitleStyle = {
    color: "#7b5dff",
    fontSize: "0.76rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    marginBottom: "0.5rem",
    display: "block",
  };

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <div style={sectionStyle}>
            <span style={miniTitleStyle}>Profile</span>
            <p style={{ textAlign: "justify", marginBottom: 0 }}>
              Hi, I’m <span className="purple">Shivam Sharma</span>, a software engineer based in India.
            </p>
          </div>

          <div style={sectionStyle}>
            <span style={miniTitleStyle}>Focus</span>
            <p style={{ textAlign: "justify", marginBottom: 0 }}>
              I work across product thinking, backend systems, scalable architecture, and engineering execution.
              My focus is on building dependable systems that can handle real-world complexity without losing clarity.
            </p>
          </div>

          <div style={sectionStyle}>
            <span style={miniTitleStyle}>Engineering Approach</span>
            <p style={{ textAlign: "justify", marginBottom: 0 }}>
              My work spans API design, cloud deployment, system integration, and performance-focused development.
              I translate business requirements into reliable technical solutions and help teams deliver with structure.
            </p>
          </div>

          <div style={sectionStyle}>
            <span style={miniTitleStyle}>Education</span>
            <p style={{ textAlign: "justify", marginBottom: 0 }}>
              I completed my B.Tech in Computer Science and Engineering from JUET, Guna, where I built a strong
              foundation in software engineering, problem solving, and systems thinking.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <p style={{ textAlign: "justify", marginBottom: "0.8rem" }}>
              <strong>Experience</strong>
            </p>
            <ul>
              <li className="about-activity">
                <ImPointRight /> <strong>Senior Software Engineer</strong>, BMW TechWorks India
                <br />
                <small>
                  <i>May 2025 - Present, Pune</i>
                </small>
              </li>
              <li className="about-activity">
                <ImPointRight /> <strong>Technical Consultant</strong>, Mercedes-Benz Research and Development India
                <br />
                <small>
                  <i>April 2023 - May 2025, Bangalore</i>
                </small>
              </li>
              <li className="about-activity">
                <ImPointRight /> <strong>Member of Technical Staff 1</strong>, alphastream.ai
                <br />
                <small>
                  <i>June 2022 - April 2023, Bangalore</i>
                </small>
              </li>
            </ul>
          </div>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
