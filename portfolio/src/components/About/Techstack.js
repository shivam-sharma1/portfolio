import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiRedis,
  SiPostgresql,
  SiTypescript,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiApachekafka,
  SiNestjs,
  SiExpress,
  SiSpring,
  SiAngular,
  SiDjango,
  SiFlask,
  SiJest,
  SiHelm,
} from "react-icons/si";

const techItems = [
  { label: "C++", icon: <CgCPlusPlus /> },
  { label: "JavaScript", icon: <DiJavascript1 /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "Python", icon: <DiPython /> },
  { label: "Java", icon: <DiJava /> },
  { label: "Node.js", icon: <DiNodejs /> },
  { label: "Express.js", icon: <SiExpress /> },
  { label: "NestJS", icon: <SiNestjs /> },
  { label: "Spring Boot", icon: <SiSpring /> },
  { label: "React", icon: <DiReact /> },
  { label: "Angular", icon: <SiAngular /> },
  { label: "Django", icon: <SiDjango /> },
  { label: "Flask", icon: <SiFlask /> },
  { label: "MongoDB", icon: <DiMongodb /> },
  { label: "Redis", icon: <SiRedis /> },
  { label: "PostgreSQL", icon: <SiPostgresql /> },
  { label: "Git", icon: <DiGit /> },
  { label: "Docker", icon: <SiDocker /> },
  { label: "Kubernetes", icon: <SiKubernetes /> },
  { label: "Helm", icon: <SiHelm /> },
  { label: "GraphQL", icon: <SiGraphql /> },
  { label: "Kafka", icon: <SiApachekafka /> },
  { label: "Jest", icon: <SiJest /> },
];

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {techItems.map(({ label, icon }) => (
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

export default Techstack;
