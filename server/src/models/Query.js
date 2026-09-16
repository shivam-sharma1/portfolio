const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    phone: {
      countryIso: { type: String, trim: true, uppercase: true, maxlength: 2 },
      countryName: { type: String, trim: true, maxlength: 120 },
      countryCode: { type: String, trim: true, maxlength: 8 },
      number: { type: String, trim: true, maxlength: 20 },
    },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    // Page the query was submitted from, useful for context.
    source: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Query", QuerySchema);
