import { IsISO8601, IsOptional, IsString, Length } from 'class-validator';

export class UpdateWorkoutDto {
  @IsOptional() @IsISO8601() performedAt?: string;
  @IsOptional() @IsString() @Length(2, 80) title?: string;
  @IsOptional() @IsString() @Length(0, 400) notes?: string;
}
