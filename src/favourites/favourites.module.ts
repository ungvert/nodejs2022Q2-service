import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TracksModule } from './../tracks/tracks.module.js';
import { ArtistsModule } from './../artists/artists.module.js';
import { AlbumsModule } from './../albums/albums.module.js';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [TracksModule, ArtistsModule, AlbumsModule],
})
export class FavouritesModule {}
