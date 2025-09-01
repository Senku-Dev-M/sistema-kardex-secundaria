import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Backend running on http://localhost:${process.env.PORT || 3000}/api`);
}
bootstrap();
