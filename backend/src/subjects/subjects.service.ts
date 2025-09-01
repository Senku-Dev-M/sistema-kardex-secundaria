import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectsRepository: Repository<Subject>,
  ) {}

  create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectsRepository.create(createSubjectDto);
    return this.subjectsRepository.save(subject);
  }

  findAll() {
    return this.subjectsRepository.find();
  }

  findOne(id: number) {
    return this.subjectsRepository.findOneBy({ id });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.subjectsRepository.update(id, updateSubjectDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const subject = await this.findOne(id);
    return this.subjectsRepository.remove(subject!);
  }
}
