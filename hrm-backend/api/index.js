// Vercel serverless function entry point
const app = require('../server');

// Export handler for Vercel
module.exports = (req, res) => {
  return app(req, res);
};

