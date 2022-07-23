import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module.js';
import { InMemoryDbModule } from './in-memory-db/in-memory.module.js';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavouritesModule } from './favourites/favourites.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    InMemoryDbModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavouritesModule,
  ],
})
export class AppModule {}
