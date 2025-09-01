import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentType } from './entities/incident-type.entity';
import { CreateIncidentTypeDto } from './dto/create-incident-type.dto';
import { UpdateIncidentTypeDto } from './dto/update-incident-type.dto';

@Injectable()
export class IncidentTypesService {
  constructor(
    @InjectRepository(IncidentType)
    private readonly incidentTypesRepository: Repository<IncidentType>,
  ) {}

  create(createIncidentTypeDto: CreateIncidentTypeDto) {
    const type = this.incidentTypesRepository.create(createIncidentTypeDto);
    return this.incidentTypesRepository.save(type);
  }

  findAll() {
    return this.incidentTypesRepository.find();
  }

  findOne(id: number) {
    return this.incidentTypesRepository.findOneBy({ id });
  }

  async update(id: number, updateIncidentTypeDto: UpdateIncidentTypeDto) {
    await this.incidentTypesRepository.update(id, updateIncidentTypeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    return this.incidentTypesRepository.remove(type!);
  }
}
