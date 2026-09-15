import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QueryForm from "./QueryForm";

export const openInquiryModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-inquiry-modal"));
  }
};

function FloatingInquiry() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleOpen = () => setShow(true);

    window.addEventListener("open-inquiry-modal", handleOpen);
    return () => window.removeEventListener("open-inquiry-modal", handleOpen);
  }, []);

  return (
    <>
      <Button className="floating-inquiry-btn" onClick={() => setShow(true)}>
        Raise Inquiry
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName="inquiry-modal"
        contentClassName="inquiry-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QueryForm embedded onSubmitted={() => setShow(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FloatingInquiry;
