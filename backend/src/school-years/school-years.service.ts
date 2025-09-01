import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolYear } from './entities/school-year.entity';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { UpdateSchoolYearDto } from './dto/update-school-year.dto';

@Injectable()
export class SchoolYearsService {
  constructor(
    @InjectRepository(SchoolYear)
    private readonly schoolYearsRepo: Repository<SchoolYear>,
  ) {}

  create(dto: CreateSchoolYearDto) {
    const year = this.schoolYearsRepo.create({
      year: dto.year,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
    });
    return this.schoolYearsRepo.save(year);
  }

  findAll() {
    return this.schoolYearsRepo.find({ relations: ['courses'] });
  }

  findOne(id: number) {
    return this.schoolYearsRepo.findOne({ where: { id }, relations: ['courses'] });
  }

  async update(id: number, dto: UpdateSchoolYearDto) {
    const partial: any = {};
    if (dto.year) partial.year = dto.year;
    if (dto.startDate) partial.startDate = new Date(dto.startDate);
    if (dto.endDate) partial.endDate = new Date(dto.endDate);
    await this.schoolYearsRepo.update(id, partial);
    return this.findOne(id);
  }

  async remove(id: number) {
    const year = await this.findOne(id);
    return this.schoolYearsRepo.remove(year!);
  }
}
