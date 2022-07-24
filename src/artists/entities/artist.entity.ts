import { v4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto.js';
import { UpdateArtistDto } from '../dto/update-artist.dto.js';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;
  constructor(artistDto: CreateArtistDto) {
    this.id = v4();
    this.name = artistDto.name;
    this.grammy = artistDto.grammy;
  }
  update(artistDto: UpdateArtistDto) {
    this.name = artistDto.name;
    this.grammy = artistDto.grammy;
  }
}
