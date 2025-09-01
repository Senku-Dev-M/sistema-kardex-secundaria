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
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('login-by-ci')
  loginByCi(@Body() dto: LoginStudentDto) {
    return this.studentsService.loginByCi(dto.ci, dto.birthDate);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }
}
