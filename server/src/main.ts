import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export const createNestServer = async (expressInstance: express.Express) => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance),
    );

    app.enableCors();
    await app.init();

    return app;
};

// Local development
async function bootstrap() {
    await createNestServer(server);
    server.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}

// Only bootstrap when running locally, not on Vercel
if (process.env.VERCEL !== '1') {
    bootstrap();
}

export { server };
