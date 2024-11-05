import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  process.env.TZ = 'America/Sao_Paulo';
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const port = 3200;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
