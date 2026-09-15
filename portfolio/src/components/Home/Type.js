import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Architecture",
          "Software Design and Development",
          "Distributed Systems and APIs",
          "Product and UX Design",
          "Development and Deployment",
          "Maintenance and Observability",
          "Performance and Reliability Engineering",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
