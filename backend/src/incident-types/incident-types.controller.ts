import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IncidentTypesService } from './incident-types.service';
import { CreateIncidentTypeDto } from './dto/create-incident-type.dto';
import { UpdateIncidentTypeDto } from './dto/update-incident-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('incident-types')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('incident-types')
export class IncidentTypesController {
  constructor(private readonly incidentTypesService: IncidentTypesService) {}

  @Roles(UserRole.ADMIN)
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

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncidentTypeDto: UpdateIncidentTypeDto,
  ) {
    return this.incidentTypesService.update(id, updateIncidentTypeDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incidentTypesService.remove(id);
  }
}
