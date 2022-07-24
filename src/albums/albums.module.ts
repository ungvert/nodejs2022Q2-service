import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavouritesModule } from '../favourites/favourites.module.js';
import { TracksModule } from '../tracks/tracks.module.js';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
  imports: [forwardRef(() => FavouritesModule), TracksModule],
})
export class AlbumsModule {}
