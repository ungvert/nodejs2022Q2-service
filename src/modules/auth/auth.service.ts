import { ForbiddenException, Injectable } from '@nestjs/common';
import { genSaltSync, hash, compare } from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtPayload } from 'jsonwebtoken';

const saltRounds = +process.env.CRYPT_SALT || 10;
const salt = genSaltSync(saltRounds);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const user = await this.usersService.findOneByLogin(createUserDto.login);

    if (!user) return null;

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) return null;

    return user;
  }

  async signup(createUserDto: CreateUserDto) {
    const passwordHash = await hash(createUserDto.password, salt);

    const user = await this.usersService.create({
      ...createUserDto,
      password: passwordHash,
    });
    return user;
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);
    if (!user) {
      throw new ForbiddenException('Not valid user');
    }

    const jwtPayload: JwtPayload = {
      login: user.login,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(jwtPayload, {
        secret: jwtConstants.accessToken.secret,
        expiresIn: jwtConstants.accessToken.expiresIn,
      }),
      refreshToken: await this.getRefreshToken(jwtPayload),
    };
  }

  async getRefreshToken(jwtPayload: JwtPayload) {
    const options = jwtConstants.refreshToken;
    return this.jwtService.sign(jwtPayload, options);
  }
}
