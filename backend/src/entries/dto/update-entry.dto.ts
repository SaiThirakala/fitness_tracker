import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class UpdateEntryDto {
  @IsOptional() @IsUUID() workoutId?: string;
  @IsOptional() @IsString() @Length(2, 60) exercise?: string;
  @IsOptional() @IsInt() @Min(1) sets?: number;
  @IsOptional() @IsInt() @Min(1) reps?: number;
  @IsOptional() @IsInt() @Min(0) weight?: number;
  @IsOptional() @IsInt() @Min(0) restSeconds?: number;
}
