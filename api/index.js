// This thin wrapper loads the compiled NestJS app and exports it
// as a Vercel serverless function handler.
const app = require('../backend/dist/main');
module.exports = app.default;
