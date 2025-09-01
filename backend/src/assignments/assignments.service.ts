import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentsRepo: Repository<Assignment>,
  ) {}

  create(dto: CreateAssignmentDto) {
    const assignment = this.assignmentsRepo.create({
      teacher: { id: dto.teacherId } as any,
      subject: { id: dto.subjectId } as any,
      course: { id: dto.courseId } as any,
    });
    return this.assignmentsRepo.save(assignment);
  }

  findAll() {
    return this.assignmentsRepo.find();
  }

  findByTeacher(teacherId: number) {
    return this.assignmentsRepo.find({ where: { teacher: { id: teacherId } } });
  }

  findOne(id: number) {
    return this.assignmentsRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateAssignmentDto) {
    const partial: any = {};
    if (dto.teacherId) partial.teacher = { id: dto.teacherId };
    if (dto.subjectId) partial.subject = { id: dto.subjectId };
    if (dto.courseId) partial.course = { id: dto.courseId };
    await this.assignmentsRepo.update(id, partial);
    return this.findOne(id);
  }

  async remove(id: number) {
    const assignment = await this.findOne(id);
    return this.assignmentsRepo.remove(assignment!);
  }
}
