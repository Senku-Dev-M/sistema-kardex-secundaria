import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Teacher, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher!: Teacher;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'subject_id' })
  subject!: Subject;

  @ManyToOne(() => Course, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'course_id' })
  course!: Course;
}
