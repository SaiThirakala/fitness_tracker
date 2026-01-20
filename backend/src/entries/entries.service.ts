import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Workout } from 'src/workouts/entities/workout.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry) private entries: Repository<Entry>,
    @InjectRepository(Workout) private workouts: Repository<Workout>,
  ) {}

  findAll() {
    return this.entries.find({ order: { id: 'DESC' } });
  }

  async findOne(id: string) {
    const e = await this.entries.findOne({ where: { id } });
    if (!e) throw new NotFoundException('Entry not found');
    return e;
  }

  async create(dto: CreateEntryDto) {
    const w = await this.workouts.findOne({ where: { id: dto.workoutId } });
    if (!w) throw new BadRequestException('workoutId does not exist');
    const entity = this.entries.create({ ...dto });
    return this.entries.save(entity);
  }

  async update(id: string, dto: UpdateEntryDto) {
    const e = await this.findOne(id);
    if (dto.workoutId) {
      const w = await this.workouts.findOne({ where: { id: dto.workoutId } });
      if (!w) throw new BadRequestException('workoutId does not exist');
    }
    Object.assign(e, dto);
    return this.entries.save(e);
  }

  async remove(id: string) {
    const res = await this.entries.delete(id);
    if (!res.affected) throw new NotFoundException('Entry not found');
  }
}
