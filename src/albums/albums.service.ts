import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { TracksService } from '../tracks/tracks.service.js';
import { InMemoryDbService } from '../in-memory-db/in-memory.service.js';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity.js';
import { FavouritesService } from '../favourites/favourites.service.js';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly db: InMemoryDbService,
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    this.db.albums.set(album.id, album);
    return album;
  }

  findAll() {
    return [...this.db.albums.values()];
  }

  findOne(id: string, notFoundStatus: HttpStatus = HttpStatus.NOT_FOUND) {
    if (!isUUID(id)) {
      throw new HttpException(
        'AlbumId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.db.albums.get(id);
    if (!album) {
      throw new HttpException(
        `Album with id ${id} doesn't exist`,
        notFoundStatus,
      );
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    album.update(updateAlbumDto);
    return album;
  }

  remove(id: string) {
    const album = this.findOne(id);
    this.db.albums.delete(album.id);

    this.favouritesService.removeAlbum(album.id);
    for (const [trackId, track] of this.db.tracks) {
      if (track.albumId === id) {
        this.tracksService.update(trackId, { albumId: null });
      }
    }
  }
}
