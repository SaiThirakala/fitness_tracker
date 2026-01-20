import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { Entry } from './entities/entry.entity';
import { Workout } from 'src/workouts/entities/workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, Workout])],
  providers: [EntriesService],
  controllers: [EntriesController],
})
export class EntriesModule {}
