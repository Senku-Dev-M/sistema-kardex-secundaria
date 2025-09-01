import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentsRepo: Repository<Enrollment>,
  ) {}

  create(dto: CreateEnrollmentDto) {
    const enrollment = this.enrollmentsRepo.create({
      student: { id: dto.studentId } as any,
      course: { id: dto.courseId } as any,
    });
    return this.enrollmentsRepo.save(enrollment);
  }

  findAll() {
    return this.enrollmentsRepo.find();
  }

  findOne(id: number) {
    return this.enrollmentsRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateEnrollmentDto) {
    const partial: any = {};
    if (dto.studentId) partial.student = { id: dto.studentId };
    if (dto.courseId) partial.course = { id: dto.courseId };
    await this.enrollmentsRepo.update(id, partial);
    return this.findOne(id);
  }

  async remove(id: number) {
    const enrollment = await this.findOne(id);
    return this.enrollmentsRepo.remove(enrollment!);
  }
}
