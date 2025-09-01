import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teachersRepository.create(createTeacherDto);
    return this.teachersRepository.save(teacher);
  }

  findAll() {
    return this.teachersRepository.find();
  }

  findOne(id: number) {
    return this.teachersRepository.findOneBy({ id });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    await this.teachersRepository.update(id, updateTeacherDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const teacher = await this.findOne(id);
    return this.teachersRepository.remove(teacher!);
  }
}
