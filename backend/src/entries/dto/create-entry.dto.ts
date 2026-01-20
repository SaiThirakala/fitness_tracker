import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class CreateEntryDto {
  @IsUUID() workoutId: string;
  @IsString() @Length(2, 60) exercise: string;
  @IsInt() @Min(1) sets: number;
  @IsInt() @Min(1) reps: number;
  @IsOptional() @IsInt() @Min(0) weight?: number;
  @IsOptional() @IsInt() @Min(0) restSeconds?: number;
}
