import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class SchoolYear {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  year!: number;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @OneToMany(() => Course, (course) => course.year)
  courses!: Course[];
}
