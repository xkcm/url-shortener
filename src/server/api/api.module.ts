import { Module } from '@nestjs/common';
import { RedisConnectionProvider, RedisService } from '../redis.service';
import { CryptoService } from './crypto/crypto.service';
import { LinksController } from './links/links.controller';
import { LinksService } from './links/links.service';

@Module({
  imports: [],
  providers: [
    CryptoService,
    RedisService,
    RedisConnectionProvider,
    LinksService
  ],
  controllers: [LinksController],
  exports: []
})
export class ApiModule {}
