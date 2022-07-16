import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/entities/artist.entity.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class InMemoryDbService {
  users: Map<User['id'], User> = new Map([]);
  artists: Map<Artist['id'], Artist> = new Map([]);
}
