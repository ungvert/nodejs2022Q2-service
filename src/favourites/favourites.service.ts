import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from './../albums/albums.service.js';
import { ArtistsService } from './../artists/artists.service.js';
import { TracksService } from './../tracks/tracks.service.js';
import {
  AlbumFavorites,
  ArtistFavorites,
  TrackFavorites,
} from './entities/favourites.entity.js';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(ArtistFavorites)
    private readonly artistFavoritesRepository: Repository<ArtistFavorites>,
    @InjectRepository(AlbumFavorites)
    private readonly albumFavoritesRepository: Repository<AlbumFavorites>,
    @InjectRepository(TrackFavorites)
    private readonly trackFavoritesRepository: Repository<TrackFavorites>,

    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}

  async getAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.artistFavoritesRepository.find({
        relations: {
          artist: true,
        },
        cache: false,
      }),
      this.albumFavoritesRepository.find({
        relations: {
          album: true,
        },
        cache: false,
      }),
      this.trackFavoritesRepository.find({
        relations: {
          track: true,
        },
        cache: false,
      }),
    ]);
    return {
      artists: artists.map(({ artist }) => artist),
      albums: albums.map(({ album }) => album),
      tracks: tracks.map(({ track }) => track),
    };
  }

  async addTrack(trackId: string) {
    const track = await this.tracksService.findOne(
      trackId,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    const trackFavorite = this.trackFavoritesRepository.create({ track });
    return this.trackFavoritesRepository.save(trackFavorite);
  }
  async removeTrack(trackId: string) {
    const trackFavorite = await this.trackFavoritesRepository.findBy({
      track: { id: trackId },
    });
    if (!trackFavorite) {
      throw new UnprocessableEntityException(
        `Track favorite with id ${trackId} not found`,
      );
    }
    this.trackFavoritesRepository.remove(trackFavorite, { transaction: false });
  }

  async addArtist(artistId: string) {
    const artist = await this.artistsService.findOne(
      artistId,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    const artistFavorite = this.artistFavoritesRepository.create({ artist });
    return this.artistFavoritesRepository.save(artistFavorite);
  }
  async removeArtist(artistId: string) {
    const artistFavorite = await this.artistFavoritesRepository.findBy({
      artist: { id: artistId },
    });
    if (!artistFavorite) {
      throw new UnprocessableEntityException(
        `Track favorite with id ${artistId} not found`,
      );
    }
    this.artistFavoritesRepository.remove(artistFavorite, {
      transaction: false,
    });
  }

  async addAlbum(albumId: string) {
    const album = await this.albumsService.findOne(
      albumId,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    const albumFavorite = this.albumFavoritesRepository.create({ album });
    return this.albumFavoritesRepository.save(albumFavorite);
  }
  async removeAlbum(albumId: string) {
    const albumFavorite = await this.albumFavoritesRepository.findBy({
      album: { id: albumId },
    });
    if (!albumFavorite) {
      throw new UnprocessableEntityException(
        `Track favorite with id ${albumId} not found`,
      );
    }
    this.albumFavoritesRepository.remove(albumFavorite, { transaction: false });
  }
}
