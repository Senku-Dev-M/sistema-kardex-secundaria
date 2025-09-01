import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentId!: number;

  @Column({ nullable: true })
  teacherId!: number;

  @Column({ nullable: true })
  subjectId!: number;

  @Column()
  typeId!: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date!: Date;
}
