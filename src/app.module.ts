import { Module } from '@nestjs/common';
import { InMemoryDbModule } from './in-memory-db/in-memory.module.js';
import { UsersModule } from './users/users.module';

@Module({
  imports: [InMemoryDbModule, UsersModule],
})
export class AppModule {}
