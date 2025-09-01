import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty()
  @IsNumber()
  studentId!: number;

  @ApiProperty()
  @IsNumber()
  courseId!: number;
}
