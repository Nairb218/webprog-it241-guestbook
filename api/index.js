// Vercel Serverless Function entry point
// Loads the compiled NestJS app and exports the Express server as the handler
const { server, createNestServer } = require('../server/dist/main');

// Initialize NestJS on the Express instance
createNestServer(server)
  .then(() => console.log('NestJS ready for Vercel'))
  .catch((err) => console.error('NestJS init error', err));

module.exports = server;
