import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateIncidentDto {
  @ApiProperty()
  @IsNumber()
  studentId!: number;

  @ApiProperty()
  @IsNumber()
  subjectId!: number;

  @ApiProperty()
  @IsNumber()
  typeId!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: string;
}
