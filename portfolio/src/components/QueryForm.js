import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { postQuery } from "../services/api";

/**
 * Contact/query form rendered at the bottom of every page.
 * Submissions (name, email, message) are stored in the database.
 */
function QueryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    focusArea: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (!form.name.trim() || !form.email.trim() || !form.focusArea || !form.message.trim()) {
      setStatus({ type: "error", text: "All fields are required." });
      return;
    }

    setSubmitting(true);
    try {
      const composedMessage = [
        `Focus area: ${form.focusArea}`,
        `Budget range: ${form.budget || "Not specified"}`,
        `Expected timeline: ${form.timeline || "Not specified"}`,
        "",
        form.message,
      ].join("\n");

      await postQuery({
        name: form.name,
        email: form.email,
        message: composedMessage,
        source: window.location.pathname,
      });
      setForm({
        name: "",
        email: "",
        focusArea: "",
        budget: "",
        timeline: "",
        message: "",
      });
      setStatus({ type: "success", text: "Thanks! Your message has been sent." });
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="query-section" id="contact">
      <Container>
        <h2 className="query-heading">
          Project <strong className="purple">Inquiry</strong>
        </h2>
        <p className="query-subheading">
          Share project scope, timeline, and technical context.
        </p>
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
                <select
                  name="focusArea"
                  value={form.focusArea}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select focus area</option>
                  <option value="Software Design and Development">
                    Software Design and Development
                  </option>
                  <option value="Software and Network Architecture">
                    Software and Network Architecture
                  </option>
                  <option value="Product and UX Design">Product and UX Design</option>
                  <option value="Development and Deployment">
                    Development and Deployment
                  </option>
                  <option value="Maintenance and Observability">
                    Maintenance and Observability
                  </option>
                  <option value="Software Consultation">Software Consultation</option>
                </select>
              </div>
              <div className="query-form-row">
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                >
                  <option value="">Estimated budget</option>
                  <option value="Under $5,000">Under $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $40,000">$15,000 - $40,000</option>
                  <option value="$40,000+">$40,000+</option>
                </select>
                <input
                  type="text"
                  name="timeline"
                  placeholder="Preferred timeline (e.g., 6 weeks)"
                  value={form.timeline}
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="message"
                placeholder="Briefly describe your product, current challenge, and what success looks like."
                rows={5}
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
