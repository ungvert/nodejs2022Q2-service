import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from './../albums/albums.service.js';
import { ArtistsService } from './../artists/artists.service.js';
import { InMemoryDbService } from './../in-memory-db/in-memory.service.js';
import { TracksService } from './../tracks/tracks.service.js';

@Injectable()
export class FavouritesService {
  constructor(
    private readonly db: InMemoryDbService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}

  getAll() {
    return {
      tracks: [...this.db.favourites.tracks.values()],
      albums: [...this.db.favourites.albums.values()],
      artists: [...this.db.favourites.artists.values()],
    };
  }

  addTrack(id: string) {
    const track = this.tracksService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    this.db.favourites.tracks.set(id, track);
    return track;
  }
  removeTrack(id: string) {
    this.db.favourites.tracks.delete(id);
    return this.getAll();
  }

  async addArtist(id: string) {
    const artist = await this.artistsService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    this.db.favourites.artists.set(id, artist);
    return artist;
  }
  removeArtist(id: string) {
    this.db.favourites.artists.delete(id);
    return this.getAll();
  }

  addAlbum(id: string) {
    const album = this.albumsService.findOne(
      id,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    this.db.favourites.albums.set(id, album);
    return album;
  }
  removeAlbum(id: string) {
    this.db.favourites.albums.delete(id);
    return this.getAll();
  }
}
