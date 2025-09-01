import { IsString } from 'class-validator';

export class CreateIncidentTypeDto {
  @IsString()
  name!: string;
}
