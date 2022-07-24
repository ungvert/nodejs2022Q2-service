import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity.js';
import { Artist } from 'src/artists/entities/artist.entity.js';
// import { Favourites } from 'src/favourites/entities/favourite.entity.js';
import { Track } from 'src/tracks/entities/track.entity.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class InMemoryDbService {
  users: Map<User['id'], User> = new Map([]);
  artists: Map<Artist['id'], Artist> = new Map([]);
  albums: Map<Album['id'], Album> = new Map([]);
  tracks: Map<Track['id'], Track> = new Map([]);
  favourites: {
    artists: Map<Artist['id'], Artist>;
    albums: Map<Album['id'], Album>;
    tracks: Map<Track['id'], Track>;
  } = {
    tracks: new Map([]),
    albums: new Map([]),
    artists: new Map([]),
  };
}
