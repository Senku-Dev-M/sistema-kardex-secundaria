import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { IncidentsModule } from './incidents/incidents.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { TeachersModule } from './teachers/teachers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { IncidentTypesModule } from './incident-types/incident-types.module';
import { Student } from './students/entities/student.entity';
import { Incident } from './incidents/entities/incident.entity';
import { Teacher } from './teachers/entities/teacher.entity';
import { Subject } from './subjects/entities/subject.entity';
import { Course } from './courses/entities/course.entity';
import { IncidentType } from './incident-types/entities/incident-type.entity';
import { SchoolYear } from './courses/entities/school-year.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '123456',
        database: process.env.DB_DATABASE || 'kardex',
        entities: [
          Student,
          Incident,
          Teacher,
          Subject,
          Course,
          IncidentType,
          SchoolYear,
        ],
        synchronize: true, // ⚠️ Solo para desarrollo
      }),
    }),
    AuthModule,
    StudentsModule,
    IncidentsModule,
    CoursesModule,
    TeachersModule,
    SubjectsModule,
    IncidentTypesModule,
  ],
})
export class AppModule {}
