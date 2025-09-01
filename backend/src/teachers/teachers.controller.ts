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
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('teachers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teachersService.remove(id);
  }
}
