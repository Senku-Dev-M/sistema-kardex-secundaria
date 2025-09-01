import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SchoolYear } from '../../school-years/entities/school-year.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  grade!: number;

  @Column({ nullable: true })
  section?: string;

  @ManyToOne(() => SchoolYear, (year) => year.courses, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'year_id' })
  year!: SchoolYear;
}
