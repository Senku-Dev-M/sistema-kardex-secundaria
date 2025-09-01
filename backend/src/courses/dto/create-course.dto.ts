import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsInt()
  grade!: number;

  @IsOptional()
  @IsString()
  section?: string;

  @IsInt()
  yearId!: number;
}
