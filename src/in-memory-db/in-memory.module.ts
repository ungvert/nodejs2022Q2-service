import { Global, Module } from '@nestjs/common';
import { InMemoryDbService } from './in-memory.service.js';

@Global()
@Module({
  providers: [InMemoryDbService],
  exports: [InMemoryDbService],
})
export class InMemoryDbModule {}
