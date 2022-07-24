import { v4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto.js';
import { UpdateAlbumDto } from '../dto/update-album.dto.js';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
  constructor(albumDto: CreateAlbumDto) {
    this.id = v4();
    this.name = albumDto.name;
    this.year = albumDto.year;
    this.artistId = albumDto.artistId || null;
  }
  update(albumDto: UpdateAlbumDto) {
    this.name = albumDto.name;
    this.year = albumDto.year;
    this.artistId = albumDto.artistId || null;
  }
}
