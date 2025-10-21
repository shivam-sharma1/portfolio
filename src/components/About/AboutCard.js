import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Shivam Sharma </span>
            from <span className="purple"> Jaipur(Raj.), India.</span>
            <br />
            I am currently employed as a Sr. Software Engineer at BMW Techworks India and living in Pune.
            <br />
            I have completed B.Tech in Computer Science and Engineering from JUET, Guna.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Riding Bikes
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>
          <p style={{ textAlign: "justify" }}>
          Past Employment
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Sr. Software Engineer, BMW TechWorks India
              <br />
              <small><i>May 2025 - Present, Pune</i></small>
            </li>
            <li className="about-activity">
              <ImPointRight /> Technical Consultant, Mercedes-Benz Research and Development India
              <br />
              <small><i>April 2023 - May 2025, Bangalore</i></small>
            </li>
            <li className="about-activity">
              <ImPointRight /> Member of Technical Staff 1, alphastream.ai
              <br />
              <small><i>June 2022 - April 2023, Bangalore</i></small>
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Embrace every challange as an opportunity to grow stronger, wiser and more honorable.  "{" "}
          </p>
          <footer className="blockquote-footer">Shivam</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
