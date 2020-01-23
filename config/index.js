var config = require("dotenv").config;
config();

// Environment variables imported from .env file
module.exports = {
  CACHE_TTL: 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  NODE_PORT: process.env.NODE_PORT || process.env.PORT || 3000,
  POTION_API_KEY: process.env.POTION_API_KEY,
  POTION_API_SECRET: process.env.POTION_API_SECRET,
  POTION_API_URL: process.env.POTION_API_URL
};
