import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity';
import { Incident } from '../incidents/entities/incident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Incident])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [TypeOrmModule, StudentsService],
})
export class StudentsModule {}
