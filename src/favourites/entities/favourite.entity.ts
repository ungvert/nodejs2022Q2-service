import { Album } from 'src/albums/entities/album.entity.js';
import { Artist } from 'src/artists/entities/artist.entity.js';
import { Track } from 'src/tracks/entities/track.entity.js';

export class Favourites {
  // artists: Map<Artist['id'], Artist>;
  // albums: Map<Album['id'], Album>;
  // tracks: Map<Track['id'], Track>;

  artists: Map<Artist['id'], Artist['id']>;
  albums: Map<Album['id'], Album['id']>;
  tracks: Map<Track['id'], Track['id']>;

  addTrack() {}
  removeTrack() {}
}

// export type Favourites = {
//   artists: Map<Artist['id'], Artist['id']>;
//   albums: Map<Album['id'], Album['id']>;
//   tracks: Map<Track['id'], Track['id']>;
// };
