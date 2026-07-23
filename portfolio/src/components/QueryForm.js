import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { postQuery } from "../services/api";

/**
 * Contact/query form rendered at the bottom of every page.
 * Submissions (name, email, message) are stored in the database.
 */
function QueryForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "All fields are required." });
      return;
    }

    setSubmitting(true);
    try {
      await postQuery({ ...form, source: window.location.pathname });
      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success", text: "Thanks! Your message has been sent." });
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="query-section">
      <Container>
        <h2 className="query-heading">
          Get in <strong className="purple">Touch</strong>
        </h2>
        <Row className="justify-content-center">
          <Col md={7}>
            <form className="query-form" onSubmit={handleSubmit}>
              <div className="query-form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Your message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
              {status.text && (
                <p className={`query-form-status ${status.type}`}>{status.text}</p>
              )}
              <button type="submit" className="query-submit-btn" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default QueryForm;
