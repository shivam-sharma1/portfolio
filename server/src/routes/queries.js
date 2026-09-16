const express = require("express");
const Query = require("../models/Query");

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_NUMBER_REGEX = /^[0-9()\-\s]{6,20}$/;

/**
 * POST /api/queries
 * Saves a contact/query form submission (name, email, message).
 */
router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, message, source } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "A valid email is required" });
    }

    let sanitizedPhone;

    if (phone) {
      const countryIso = typeof phone.countryIso === "string" ? phone.countryIso.trim().toUpperCase() : "";
      const countryName = typeof phone.countryName === "string" ? phone.countryName.trim() : "";
      const countryCode = typeof phone.countryCode === "string" ? phone.countryCode.trim() : "";
      const number = typeof phone.number === "string" ? phone.number.trim() : "";

      if (!countryIso || !countryName || !countryCode || !number) {
        return res.status(400).json({ error: "Phone details must include country and number" });
      }

      if (!PHONE_NUMBER_REGEX.test(number)) {
        return res.status(400).json({ error: "A valid phone number is required" });
      }

      sanitizedPhone = { countryIso, countryName, countryCode, number };
    }

    await Query.create({ name, email, phone: sanitizedPhone, message, source });
    res.status(201).json({ ok: true, message: "Thanks! Your message has been received." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
