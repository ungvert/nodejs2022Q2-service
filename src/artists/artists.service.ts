import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service.js';
import { FavouritesService } from '../favourites/favourites.service.js';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity.js';
import { AlbumsService } from '../albums/albums.service.js';
import { Repository } from 'typeorm';
import { InMemoryDbService } from '../in-memory-db/in-memory.service.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly db: InMemoryDbService,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(artist);
  }

  findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string, notFoundStatus: HttpStatus = HttpStatus.NOT_FOUND) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} doesn't exist`,
        notFoundStatus,
      );
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.preload({
      id,
      ...updateArtistDto,
    });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    return this.artistRepository.save(artist);
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    return this.artistRepository.remove(artist);

    // TODO: move to separate methods
    // this.db.artists.delete(artist.id);

    // this.favouritesService.removeArtist(artist.id);
    // for (const [trackId, track] of this.db.tracks) {
    //   if (track.artistId === id) {
    //     this.tracksService.update(trackId, { artistId: null }); //albumId: null
    //   }
    // }
    // for (const [albumId, album] of this.db.albums) {
    //   if (album.artistId === id) {
    //     this.albumsService.update(albumId, { artistId: null });
    //   }
    // }
  }
}
