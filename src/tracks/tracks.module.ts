import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavouritesModule } from '../favourites/favourites.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity.js';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => FavouritesModule),
  ],
})
export class TracksModule {}
