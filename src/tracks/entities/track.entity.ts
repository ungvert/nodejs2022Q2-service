import { v4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto.js';
import { UpdateTrackDto } from '../dto/update-track.dto.js';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  constructor(trackDto: CreateTrackDto) {
    this.id = v4();
    this.name = trackDto.name;
    this.albumId = trackDto.albumId || null;
    this.artistId = trackDto.artistId || null;
    this.duration = trackDto.duration;
  }
  update(trackDto: UpdateTrackDto) {
    this.name = trackDto.name;
    this.albumId = trackDto.albumId || null;
    this.artistId = trackDto.artistId || null;
    this.duration = trackDto.duration;
  }
}
