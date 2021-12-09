import { Global, Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { RedisConnectionProvider, RedisService } from './redis.service';

// @Global()
@Module({
  imports: [ApiModule],
  exports: [],
  controllers: [],
  providers: [RedisConnectionProvider, RedisService]
})
export class AppModule {}
