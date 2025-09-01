import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Incident } from '../incidents/entities/incident.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(Incident)
    private readonly incidentsRepo: Repository<Incident>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }

  findAll() {
    return this.studentsRepository.find();
  }

  findOne(id: number) {
    return this.studentsRepository.findOneBy({ id });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    await this.studentsRepository.update(id, updateStudentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return this.studentsRepository.remove(student!);
  }

  async loginByCi(ci: string, birthDate: string) {
    const student = await this.studentsRepository.findOne({
      where: { ci, birthDate: new Date(birthDate) },
    });
    if (!student) throw new UnauthorizedException('Invalid credentials');
    const incidents = await this.incidentsRepo.find({
      where: { student: { id: student.id } },
      relations: ['teacher', 'subject', 'type'],
    });
    return { student, incidents };
  }
}
