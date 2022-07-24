import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { TracksService } from '../tracks/tracks.service.js';
import { FavouritesService } from '../favourites/favourites.service.js';
import { InMemoryDbService } from '../in-memory-db/in-memory.service.js';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity.js';
import { AlbumsService } from '../albums/albums.service.js';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly db: InMemoryDbService,
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}

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

    this.favouritesService.removeArtist(artist.id);
    for (const [trackId, track] of this.db.tracks) {
      if (track.artistId === id) {
        this.tracksService.update(trackId, { artistId: null }); //albumId: null
      }
    }
    for (const [albumId, album] of this.db.albums) {
      if (album.artistId === id) {
        this.albumsService.update(albumId, { artistId: null });
      }
    }
  }
}
