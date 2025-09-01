import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IncidentType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
