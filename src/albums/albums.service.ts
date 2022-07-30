import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
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
  }
}
