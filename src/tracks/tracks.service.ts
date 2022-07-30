import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity.js';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepository.create({ ...createTrackDto });
    return this.trackRepository.save(track);
  }

  findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string, notFoundStatus: HttpStatus = HttpStatus.NOT_FOUND) {
    const track = await this.trackRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    if (!track) {
      throw new HttpException(
        `Track with id ${id} doesn't exist`,
        notFoundStatus,
      );
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.preload({ id, ...updateTrackDto });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} doesn't exist`);
    }
    return this.trackRepository.save(track);
  }

  async remove(id: string) {
    const track = await this.findOne(id);
    return this.trackRepository.remove(track);
  }
}
