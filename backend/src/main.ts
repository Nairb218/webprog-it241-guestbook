import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

const server = express();

// Cache the NestJS app so it's only created once per cold start
let isInitialized = false;

async function bootstrap() {
  if (isInitialized) return;

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors(); // Allows frontend to talk to backend
  app.setGlobalPrefix('api'); // All routes start with /api
  await app.init();

  isInitialized = true;
}

// For LOCAL development: start listening on port 3000
if (!process.env.VERCEL) {
  bootstrap().then(() => {
    server.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  });
}

// For VERCEL: export a request handler (no port listening!)
export default async (req: express.Request, res: express.Response) => {
  await bootstrap();
  server(req, res);
};