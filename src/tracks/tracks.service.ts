import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { InMemoryDbService } from '../in-memory-db/in-memory.service.js';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity.js';

@Injectable()
export class TracksService {
  constructor(private readonly db: InMemoryDbService) {}

  create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    this.db.tracks.set(track.id, track);
    return track;
  }

  findAll() {
    return [...this.db.tracks.values()];
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'TrackId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.db.tracks.get(id);
    if (!track) {
      throw new HttpException(
        `Track with id ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    track.update(updateTrackDto);
    return track;
  }

  remove(id: string) {
    const track = this.findOne(id);
    this.db.tracks.delete(track.id);
    return;
  }
}
