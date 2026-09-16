import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Modern Software Architecture",
          "Rapid, Quality-First Development",
          "Distributed Systems & APIs",
          "Production Observability & Reliability",
          "Cloud-Native Engineering",
          "Performance & Scalability",
          "AI-Augmented Delivery",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
