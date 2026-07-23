const express = require("express");
const Query = require("../models/Query");

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/queries
 * Saves a contact/query form submission (name, email, message).
 */
router.post("/", async (req, res, next) => {
  try {
    const { name, email, message, source } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: "A valid email is required" });
    }

    await Query.create({ name, email, message, source });
    res.status(201).json({ ok: true, message: "Thanks! Your message has been received." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
