import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiJira,
  SiGithubactions,
  SiAmazonaws,
  SiJenkins,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiGithub,
  SiHelm,
} from "react-icons/si";

const toolItems = [
  { label: "VS Code", icon: <SiVisualstudiocode /> },
  { label: "GitHub", icon: <SiGithub /> },
  { label: "Postman", icon: <SiPostman /> },
  { label: "Jira", icon: <SiJira /> },
  { label: "GitHub Actions", icon: <SiGithubactions /> },
  { label: "AWS", icon: <SiAmazonaws /> },
  { label: "Jenkins", icon: <SiJenkins /> },
  { label: "Terraform", icon: <SiTerraform /> },
  { label: "Helm", icon: <SiHelm /> },
  { label: "Prometheus", icon: <SiPrometheus /> },
  { label: "Grafana", icon: <SiGrafana /> },
];

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {toolItems.map(({ label, icon }) => (
        <Col
          key={label}
          xs={4}
          md={2}
          className="tech-icons"
          data-label={label}
          title={label}
          aria-label={label}
          tabIndex={0}
        >
          {icon}
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
