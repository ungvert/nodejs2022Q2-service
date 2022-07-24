import { forwardRef, Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TracksModule } from './../tracks/tracks.module.js';
import { ArtistsModule } from './../artists/artists.module.js';
import { AlbumsModule } from './../albums/albums.module.js';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
})
export class FavouritesModule {}
