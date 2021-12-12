import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config, initiateConfiguration } from '../shared/config';
import { Config } from './common';

async function bootstrap() {
  await initiateConfiguration([
    [Config.HTTP_PORT, 3001]
  ])

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(config<number>(Config.HTTP_PORT));
}

bootstrap();
