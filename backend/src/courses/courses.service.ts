import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const course = this.coursesRepository.create({
      grade: createCourseDto.grade,
      section: createCourseDto.section,
      year: { id: createCourseDto.yearId },
    });
    return this.coursesRepository.save(course);
  }

  findAll() {
    return this.coursesRepository.find();
  }

  findOne(id: number) {
    return this.coursesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepository.preload({
      id,
      grade: updateCourseDto.grade,
      section: updateCourseDto.section,
      year: updateCourseDto.yearId
        ? ({ id: updateCourseDto.yearId } as any)
        : undefined,
    });
    if (!course) {
      return null;
    }
    return this.coursesRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    return this.coursesRepository.remove(course!);
  }
}
