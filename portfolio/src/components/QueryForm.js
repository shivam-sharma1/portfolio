import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { postQuery } from "../services/api";
import { countryPhoneOptions } from "../data/countryPhoneOptions";

/**
 * Project inquiry form used in the floating inquiry modal.
 * Submissions (name, email, message) are stored in the database.
 */
function QueryForm({ embedded = false, onSubmitted }) {
  const currencyOptions = {
    USD: [
      { value: "Under $5,000", label: "Under $5,000" },
      { value: "$5,000 - $15,000", label: "$5,000 - $15,000" },
      { value: "$15,000 - $40,000", label: "$15,000 - $40,000" },
      { value: "$40,000+", label: "$40,000+" },
    ],
    INR: [
      { value: "Under ₹5,00,000", label: "Under ₹5,00,000" },
      { value: "₹5,00,000 - ₹15,00,000", label: "₹5,00,000 - ₹15,00,000" },
      { value: "₹15,00,000 - ₹40,00,000", label: "₹15,00,000 - ₹40,00,000" },
      { value: "₹40,00,000+", label: "₹40,00,000+" },
    ],
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneCountry: null,
    phoneNumber: "",
    focusArea: "",
    currency: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);
  const phonePattern = /^[0-9()\-\s]{6,20}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "currency") {
        next.budget = "";
      }

      return next;
    });
  };

  const handlePhoneCountryChange = (option) => {
    setForm((prev) => ({ ...prev, phoneCountry: option || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    const trimmedPhoneNumber = form.phoneNumber.trim();
    const hasPhoneFields = Boolean(form.phoneCountry) || Boolean(trimmedPhoneNumber);

    if (!form.name.trim() || !form.email.trim() || !form.focusArea || !form.message.trim()) {
      setStatus({ type: "error", text: "All fields are required." });
      return;
    }

    if (hasPhoneFields && (!form.phoneCountry || !trimmedPhoneNumber)) {
      setStatus({
        type: "error",
        text: "Add both country code and mobile number, or leave both blank.",
      });
      return;
    }

    if (trimmedPhoneNumber && !phonePattern.test(trimmedPhoneNumber)) {
      setStatus({
        type: "error",
        text: "Use a valid mobile number with 6 to 20 digits and separators only.",
      });
      return;
    }

    const phoneDetails = form.phoneCountry && trimmedPhoneNumber
      ? {
          countryIso: form.phoneCountry.value,
          countryName: form.phoneCountry.countryName,
          countryCode: form.phoneCountry.dialCode,
          number: trimmedPhoneNumber,
        }
      : null;

    setSubmitting(true);
    try {
      const composedMessage = [
        `Focus area: ${form.focusArea}`,
        `Mobile: ${phoneDetails ? `${phoneDetails.countryCode} ${phoneDetails.number} (${phoneDetails.countryName})` : "Not specified"}`,
        `Currency: ${form.currency || "Not specified"}`,
        `Budget range: ${form.budget || "Not specified"}`,
        `Expected timeline: ${form.timeline || "Not specified"}`,
        "",
        form.message,
      ].join("\n");

      await postQuery({
        name: form.name,
        email: form.email,
        phone: phoneDetails,
        message: composedMessage,
        source: window.location.pathname,
      });
      setForm({
        name: "",
        email: "",
        phoneCountry: null,
        phoneNumber: "",
        focusArea: "",
        currency: "",
        budget: "",
        timeline: "",
        message: "",
      });
      setStatus({ type: "success", text: "Thanks! Your message has been sent." });
      if (onSubmitted) {
        onSubmitted();
      }
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const budgetOptions = form.currency ? currencyOptions[form.currency] || [] : [];

  const formBody = (
    <>
      <div className={embedded ? "query-panel-header" : undefined}>
        <h2 className="query-heading">
          Project <strong className="purple">Inquiry</strong>
        </h2>
        <p className="query-subheading">
          Share project scope, timeline, and technical context.
        </p>
      </div>
      <Row className="justify-content-center">
        <Col md={embedded ? 12 : 7}>
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
                  aria-label="Focus area"
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
                <div className="query-phone-country">
                  <label className="visually-hidden" htmlFor="phone-country-code">
                    Country code
                  </label>
                  <Select
                    inputId="phone-country-code"
                    instanceId="phone-country-code"
                    aria-label="Country code"
                    classNamePrefix="query-phone-select"
                    className="query-phone-country-select"
                    options={countryPhoneOptions}
                    value={form.phoneCountry}
                    onChange={handlePhoneCountryChange}
                    isClearable
                    isSearchable
                    placeholder="Country code (optional)"
                    noOptionsMessage={() => "No country found"}
                    formatOptionLabel={(option, { context }) => {
                      if (context === "value") {
                        return `${option.flag} ${option.countryName} (${option.dialCode})`;
                      }

                      return (
                        <div className="query-phone-option">
                          <span className="query-phone-option-main">
                            <span className="query-phone-option-flag">{option.flag}</span>
                            <span>{option.countryName}</span>
                          </span>
                          <span className="query-phone-option-code">{option.dialCode}</span>
                        </div>
                      );
                    }}
                  />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  aria-label="Mobile number"
                  placeholder="Mobile number (optional)"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  inputMode="tel"
                  autoComplete="tel-national"
                />
              </div>
              <div className="query-form-row">
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  aria-label="Currency"
                >
                  <option value="">Select currency</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  aria-label="Budget"
                  disabled={!form.currency}
                >
                  <option value="">{form.currency ? `Estimated budget (${form.currency})` : "Estimated budget"}</option>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
    </>
  );

  if (embedded) {
    return <div className="query-panel">{formBody}</div>;
  }

  return (
    <Container fluid className="query-section" id="contact">
      <Container>{formBody}</Container>
    </Container>
  );
}

export default QueryForm;
