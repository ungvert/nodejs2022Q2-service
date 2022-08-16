import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  artist: Artist;

  @Column({ nullable: true })
  artistId: Artist['id'] | null;

  @ManyToOne(() => Album, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  album: Album | null;

  @Column({ nullable: true })
  albumId: Album['id'] | null;
}
