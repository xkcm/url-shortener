import { Module } from '@nestjs/common';
import { RedisConnectionProvider, RedisService } from 'src/redis.service';
import { CryptoService } from './crypto/crypto.service';

@Module({
  imports: [],
  providers: [
    CryptoService,
    RedisService,
    RedisConnectionProvider
  ],
  controllers: [],
  exports: []
})
export class ApiModule {}
