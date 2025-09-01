import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Incident } from '../incidents/entities/incident.entity';
import { Assignment } from '../assignments/entities/assignment.entity';
import { Enrollment } from '../enrollments/entities/enrollment.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentsRepo: Repository<Incident>,
    @InjectRepository(Assignment)
    private readonly assignmentsRepo: Repository<Assignment>,
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
  ) {}

  async incidentsByCourse(courseId: number, teacherId: number) {
    const assignment = await this.assignmentsRepo.findOne({
      where: { course: { id: courseId }, teacher: { id: teacherId } },
    });
    if (!assignment) throw new ForbiddenException('Not assigned to this course');
    const enrollments = await this.enrollmentsRepo.find({
      where: { course: { id: courseId } },
      relations: ['student'],
    });
    const studentIds = enrollments.map((e) => e.student.id);
    if (studentIds.length === 0) return [];
    return this.incidentsRepo.find({
      where: { student: { id: In(studentIds) } },
      relations: ['student', 'subject', 'type', 'teacher'],
    });
  }
}
