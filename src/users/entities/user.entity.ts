import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(userDto: CreateUserDto) {
    this.login = userDto.login;
    this.password = userDto.password;

    this.id = v4();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
  updatePassword(userDto: UpdateUserDto) {
    this.password = userDto.newPassword;
    this.version++;
    this.updatedAt = Date.now();
  }
}
