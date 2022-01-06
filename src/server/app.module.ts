import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { RedisConnectionProvider, RedisService } from './redis.service';

@Module({
  imports: [ApiModule, ConfigModule.forRoot({
    isGlobal: true
  }), ServeStaticModule.forRoot({
    rootPath: join(__dirname, 'client-web-app/')
  })],
  exports: [],
  controllers: [],
  providers: [RedisConnectionProvider, RedisService]
})
export class AppModule {}
