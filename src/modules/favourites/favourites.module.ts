import { forwardRef, Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from './../artists/artists.module';
import { AlbumsModule } from './../albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AlbumFavorites,
  ArtistFavorites,
  TrackFavorites,
} from './entities/favourites.entity';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  exports: [FavouritesService],
  imports: [
    TypeOrmModule.forFeature([ArtistFavorites, AlbumFavorites, TrackFavorites]),
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
})
export class FavouritesModule {}
