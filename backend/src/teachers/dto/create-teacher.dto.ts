import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
