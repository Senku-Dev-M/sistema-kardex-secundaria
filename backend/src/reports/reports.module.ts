import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Incident } from '../incidents/entities/incident.entity';
import { Assignment } from '../assignments/entities/assignment.entity';
import { Enrollment } from '../enrollments/entities/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incident, Assignment, Enrollment])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
