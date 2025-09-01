import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsNumber()
  teacherId!: number;

  @ApiProperty()
  @IsNumber()
  subjectId!: number;

  @ApiProperty()
  @IsNumber()
  courseId!: number;
}
