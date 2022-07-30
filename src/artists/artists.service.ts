import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(artist);
  }

  findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string, notFoundStatus: HttpStatus = HttpStatus.NOT_FOUND) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        `Artist with id ${id} doesn't exist`,
        notFoundStatus,
      );
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.preload({
      id,
      ...updateArtistDto,
    });
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    return this.artistRepository.save(artist);
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    return this.artistRepository.remove(artist);
  }
}
