import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { FavouritesModule } from '../favourites/favourites.module.js';
import { TracksModule } from '../tracks/tracks.module.js';
import { AlbumsModule } from '../albums/albums.module.js';
import { Artist } from './entities/artist.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
  imports: [
    TypeOrmModule.forFeature([Artist]),
    forwardRef(() => FavouritesModule),
    TracksModule,
    forwardRef(() => AlbumsModule),
  ],
})
export class ArtistsModule {}
