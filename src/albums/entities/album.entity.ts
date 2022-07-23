import { Artist } from '../../artists/entities/artist.entity.js';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  // @JoinTable()
  @ManyToOne(() => Artist, { nullable: true })
  artistId: Artist['id'] | null;
  // constructor(albumDto: CreateAlbumDto) {
  //   this.id = v4();
  //   this.name = albumDto.name;
  //   this.year = albumDto.year;
  //   this.artistId = albumDto.artistId || null;
  // }
  // update(albumDto: UpdateAlbumDto) {
  //   this.name = albumDto.name;
  //   this.year = albumDto.year;
  //   this.artistId = albumDto.artistId || null;
  // }
}
