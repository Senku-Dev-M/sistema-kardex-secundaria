import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IncidentTypesService } from './incident-types.service';
import { CreateIncidentTypeDto } from './dto/create-incident-type.dto';
import { UpdateIncidentTypeDto } from './dto/update-incident-type.dto';

@ApiTags('incident-types')
@Controller('incident-types')
export class IncidentTypesController {
  constructor(private readonly incidentTypesService: IncidentTypesService) {}

  @Post()
  create(@Body() createIncidentTypeDto: CreateIncidentTypeDto) {
    return this.incidentTypesService.create(createIncidentTypeDto);
  }

  @Get()
  findAll() {
    return this.incidentTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incidentTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncidentTypeDto: UpdateIncidentTypeDto,
  ) {
    return this.incidentTypesService.update(id, updateIncidentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incidentTypesService.remove(id);
  }
}
