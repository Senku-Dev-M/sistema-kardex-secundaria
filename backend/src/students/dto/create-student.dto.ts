import { IsDateString, IsOptional, IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  ci!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsDateString()
  birthDate!: string;

  @IsOptional()
  @IsString()
  @Length(1, 1)
  gender?: string;
}
