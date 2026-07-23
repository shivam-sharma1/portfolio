const mongoose = require("mongoose");

/**
 * Builds the MongoDB connection string from environment variables so that
 * no credentials are ever hard-coded in the codebase.
 */
function buildMongoUri() {
  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_APP_NAME } = process.env;

  if (!DB_USERNAME || !DB_PASSWORD || !DB_HOST) {
    throw new Error(
      "Missing MongoDB configuration. Ensure DB_USERNAME, DB_PASSWORD and DB_HOST are set."
    );
  }

  const user = encodeURIComponent(DB_USERNAME);
  const pass = encodeURIComponent(DB_PASSWORD);
  const appName = DB_APP_NAME ? `&appName=${encodeURIComponent(DB_APP_NAME)}` : "";

  return `mongodb+srv://${user}:${pass}@${DB_HOST}/?retryWrites=true&w=majority${appName}`;
}

async function connectDB() {
  const dbName = process.env.DB_NAME || "portfolio";
  await mongoose.connect(buildMongoUri(), { dbName });
  console.log(`MongoDB connected (db: ${dbName})`);
}

module.exports = { connectDB };
