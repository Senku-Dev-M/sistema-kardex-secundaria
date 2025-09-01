import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentTypesService } from './incident-types.service';
import { IncidentTypesController } from './incident-types.controller';
import { IncidentType } from './entities/incident-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentType])],
  controllers: [IncidentTypesController],
  providers: [IncidentTypesService],
  exports: [TypeOrmModule],
})
export class IncidentTypesModule {}
