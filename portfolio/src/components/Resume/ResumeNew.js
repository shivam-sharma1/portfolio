import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/Shivam Sharma - Gen.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleDownload = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(pdf, { cache: "no-store" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = "Shivam Sharma.pdf";
      anchor.rel = "noopener noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.location.href = pdf;
    }
  };

  const handleLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  const pageWidth = width > 1200 ? 900 : width > 992 ? 820 : width > 768 ? 680 : Math.max(width - 48, 280);

  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="resume-hero">
              <p className="services-eyebrow">Resume</p>
              <h1 className="project-heading">Professional Experience and Background</h1>
              <p className="services-intro resume-intro">
                A consolidated view of experience, technical background, and delivery-focused engineering work.
              </p>
              <Button
                as="a"
                variant="primary"
                href={pdf}
                download="Shivam Sharma.pdf"
                onClick={handleDownload}
                className="resume-download-btn"
              >
                <AiOutlineDownload />
                &nbsp;Download Resume
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="resume-viewer-row justify-content-center">
          <Col lg={10}>
            <div className="resume-document-shell">
              <Document
                file={pdf}
                onLoadSuccess={handleLoadSuccess}
                className="resume-document"
              >
                {Array.from(new Array(numPages), (_, index) => (
                  <div className="resume-page-wrap" key={`resume-page-${index + 1}`}>
                    <Page pageNumber={index + 1} width={pageWidth} />
                  </div>
                ))}
              </Document>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ResumeNew;
