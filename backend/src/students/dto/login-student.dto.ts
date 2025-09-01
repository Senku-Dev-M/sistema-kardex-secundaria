import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class LoginStudentDto {
  @ApiProperty()
  @IsString()
  ci!: string;

  @ApiProperty()
  @IsDateString()
  birthDate!: string;
}
