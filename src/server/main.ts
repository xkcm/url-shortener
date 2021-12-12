import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config, initiateConfig } from './config';

async function bootstrap() {
  await initiateConfig()
  const app = await NestFactory.create(AppModule);
  await app.listen(config<number>('HTTP:PORT'));
}

bootstrap();
