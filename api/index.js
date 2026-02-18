// Vercel Serverless Function entry point
const { server, createNestServer } = require('../server/dist/main');

let initialized = false;
let initPromise = null;

function ensureInit() {
  if (!initPromise) {
    initPromise = createNestServer(server)
      .then(() => {
        initialized = true;
        console.log('NestJS ready for Vercel');
      })
      .catch((err) => {
        initPromise = null; // allow retry
        console.error('NestJS init error', err);
        throw err;
      });
  }
  return initPromise;
}

module.exports = async (req, res) => {
  await ensureInit();
  return server(req, res);
};
