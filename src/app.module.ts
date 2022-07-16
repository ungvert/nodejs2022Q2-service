import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module.js';
import { InMemoryDbModule } from './in-memory-db/in-memory.module.js';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [InMemoryDbModule, UsersModule, ArtistsModule, AlbumsModule],
})
export class AppModule {}
