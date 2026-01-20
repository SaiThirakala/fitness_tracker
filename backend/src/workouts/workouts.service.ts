import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(@InjectRepository(Workout) private repo: Repository<Workout>) {}

  findAll() {
    return this.repo.find({ order: { performedAt: 'DESC' } });
  }

  async findOne(id: string) {
    const w = await this.repo.findOne({
      where: { id },
      relations: { entries: true },
    });
    if (!w) throw new NotFoundException('Workout not found');
    return w;
  }

  create(dto: CreateWorkoutDto) {
    const entity = this.repo.create({
      title: dto.title,
      notes: dto.notes,
      performedAt: new Date(dto.performedAt),
    });
    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateWorkoutDto) {
    const w = await this.findOne(id);
    if (dto.performedAt) w.performedAt = new Date(dto.performedAt);
    if (dto.title !== undefined) w.title = dto.title;
    if (dto.notes !== undefined) w.notes = dto.notes;
    return this.repo.save(w);
  }

  async remove(id: string) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Workout not found');
  }
}
