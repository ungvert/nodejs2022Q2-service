import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class InMemoryDbService {
  users: Map<User['id'], User> = new Map([]);
}
