import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const whitelist = ['http://localhost:3001'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  });
  await app.listen(3000);
}
bootstrap();
