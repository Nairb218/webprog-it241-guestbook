import { server, createNestServer } from '../dist/main';

createNestServer(server)
    .then(() => {
        console.log('Nest server initialized for Vercel');
    })
    .catch((err) => {
        console.error('Nest server init error', err);
    });

export default server;
