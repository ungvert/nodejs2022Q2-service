import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service.js';
import { InMemoryDbService } from '../in-memory-db/in-memory.service.js';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity.js';
import { FavouritesService } from '../favourites/favourites.service.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly db: InMemoryDbService,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(album);
  }

  findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string, notFoundStatus: HttpStatus = HttpStatus.NOT_FOUND) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        `Album with id ${id} doesn't exist`,
        notFoundStatus,
      );
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.preload({ id, ...updateAlbumDto });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} doesn't exist`);
    }
    return this.albumRepository.save(album);
  }

  async remove(id: string) {
    const album = await this.findOne(id);
    return this.albumRepository.remove(album);

    // this.favouritesService.removeAlbum(album.id);
    // for (const [trackId, track] of this.db.tracks) {
    //   if (track.albumId === id) {
    //     this.tracksService.update(trackId, { albumId: null });
    //   }
    // }
  }
}
