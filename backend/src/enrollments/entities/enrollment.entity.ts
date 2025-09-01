import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Student, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ManyToOne(() => Course, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'course_id' })
  course!: Course;
}
