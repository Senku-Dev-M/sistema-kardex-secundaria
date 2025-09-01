import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from '../../teachers/entities/teacher.entity';

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TEACHER })
  role!: UserRole;

  @ManyToOne(() => Teacher, { nullable: true, eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teacher_id' })
  teacher?: Teacher;
}
