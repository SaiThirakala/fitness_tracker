import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Entry } from 'src/entries/entities/entry.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'timestamptz' }) performedAt: Date;

  @Column({ length: 80 }) title: string;

  @Column({ nullable: true, length: 400 }) notes?: string;

  @OneToMany(() => Entry, (e) => e.workout, { cascade: ['remove'] })
  entries: Entry[];
}
