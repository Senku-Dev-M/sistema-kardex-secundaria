import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolYear } from './entities/school-year.entity';
import { SchoolYearsService } from './school-years.service';
import { SchoolYearsController } from './school-years.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolYear])],
  controllers: [SchoolYearsController],
  providers: [SchoolYearsService],
})
export class SchoolYearsModule {}
