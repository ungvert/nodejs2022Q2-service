import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { InMemoryDbService } from '../in-memory-db/in-memory.service.js';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity.js';

@Injectable()
export class AlbumsService {
  constructor(private readonly db: InMemoryDbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    this.db.albums.set(album.id, album);
    return album;
  }

  findAll() {
    return [...this.db.albums.values()];
  }

  findOne(id: string) {
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
        HttpStatus.NOT_FOUND,
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
    return;
  }
}
