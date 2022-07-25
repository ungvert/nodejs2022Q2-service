import { Album } from '../../albums/entities/album.entity.js';
import { Artist } from '../../artists/entities/artist.entity.js';
import { Track } from '../../tracks/entities/track.entity.js';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtistFavorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Artist, { onDelete: 'CASCADE' })
  @JoinColumn()
  artist: Artist;
}

@Entity()
export class AlbumFavorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Album, { onDelete: 'CASCADE' })
  @JoinColumn()
  album: Album;
}

@Entity()
export class TrackFavorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Track, { onDelete: 'CASCADE' })
  @JoinColumn()
  track: Track;
}
