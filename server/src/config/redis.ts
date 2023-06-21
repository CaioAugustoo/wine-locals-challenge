import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super();

    super.on('error', (err) => {
      console.log('Redis error: ' + err);
      console.log(err);
      process.exit(1);
    });
  }
}
