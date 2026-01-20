import { IsISO8601, IsOptional, IsString, Length } from 'class-validator';

export class CreateWorkoutDto {
  @IsISO8601() performedAt: string;
  @IsString() @Length(2, 80) title: string;
  @IsOptional() @IsString() @Length(0, 400) notes?: string;
}
