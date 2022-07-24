import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { InMemoryDbService } from '../in-memory-db/in-memory.service.js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(private readonly db: InMemoryDbService) {}

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    this.db.users.set(user.id, user);
    return user;
  }

  findAll() {
    return [...this.db.users.values()];
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException(
        'UserId is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.db.users.get(id);
    if (!user) {
      throw new HttpException(
        `User with id ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (updateUserDto.oldPassword !== user.password) {
      throw new HttpException(`Wrong old password`, HttpStatus.FORBIDDEN);
    }
    user.updatePassword(updateUserDto);
    return user;
  }

  remove(id: string) {
    const user = this.findOne(id);
    this.db.users.delete(user.id);
    return;
  }
}
