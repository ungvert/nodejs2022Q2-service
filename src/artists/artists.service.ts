import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { InMemoryDbService } from '../in-memory-db/in-memory.service.js';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity.js';

@Injectable()
export class ArtistsService {
  constructor(private readonly db: InMemoryDbService) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    this.db.artists.set(artist.id, artist);
    return artist;
  }

  findAll() {
    return [...this.db.artists.values()];
  }

  findOne(id: string, notFoundStatus: HttpStatus = HttpStatus.NOT_FOUND) {
    if (!isUUID(id)) {
      throw new HttpException(
        'ArtistId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const artist = this.db.artists.get(id);
    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} doesn't exist`,
        notFoundStatus,
      );
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    artist.update(updateArtistDto);
    return artist;
  }

  remove(id: string) {
    const artist = this.findOne(id);
    this.db.artists.delete(artist.id);
    return;
  }
}
