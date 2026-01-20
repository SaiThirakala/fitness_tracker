import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Workout } from 'src/workouts/entities/workout.entity';

@Entity('entries')
export class Entry {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Workout, (w) => w.entries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workoutId' })
  workout: Workout;

  @Column('uuid') workoutId: string;

  @Column({ length: 60 }) exercise: string;

  @Column('int') sets: number;

  @Column('int') reps: number;

  @Column({ type: 'int', nullable: true }) weight?: number;

  @Column({ type: 'int', nullable: true }) restSeconds?: number;
}
