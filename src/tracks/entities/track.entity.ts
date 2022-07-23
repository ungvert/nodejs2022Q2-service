import { Album } from '../../albums/entities/album.entity.js';
import { Artist } from '../../artists/entities/artist.entity.js';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, { nullable: true })
  artistId: Artist['id'] | null;

  @ManyToOne(() => Album, { nullable: true })
  albumId: Album['id'] | null;
}
