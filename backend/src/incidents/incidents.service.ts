import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentsRepo: Repository<Incident>,
  ) {}

  create(dto: CreateIncidentDto, teacherId: number) {
    const incident = this.incidentsRepo.create({
      student: { id: dto.studentId } as any,
      subject: { id: dto.subjectId } as any,
      type: { id: dto.typeId } as any,
      teacher: teacherId ? ({ id: teacherId } as any) : undefined,
      description: dto.description,
      date: dto.date ? new Date(dto.date) : undefined,
    });
    return this.incidentsRepo.save(incident);
  }

  findAll() {
    return this.incidentsRepo.find({
      relations: ['student', 'teacher', 'subject', 'type'],
    });
  }

  findByStudent(studentId: number) {
    return this.incidentsRepo.find({
      where: { student: { id: studentId } },
      relations: ['student', 'teacher', 'subject', 'type'],
    });
  }

  findOne(id: number) {
    return this.incidentsRepo.findOne({ where: { id }, relations: ['student', 'teacher', 'subject', 'type'] });
  }

  async update(id: number, dto: UpdateIncidentDto) {
    const partial: any = {};
    if (dto.studentId) partial.student = { id: dto.studentId };
    if (dto.subjectId) partial.subject = { id: dto.subjectId };
    if (dto.typeId) partial.type = { id: dto.typeId };
    if (dto.description !== undefined) partial.description = dto.description;
    if (dto.date) partial.date = new Date(dto.date);
    await this.incidentsRepo.update(id, partial);
    return this.findOne(id);
  }

  async remove(id: number) {
    const incident = await this.findOne(id);
    return this.incidentsRepo.remove(incident!);
  }
}
