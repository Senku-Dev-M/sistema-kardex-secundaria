import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { IncidentsModule } from './incidents/incidents.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { Student } from './students/entities/student.entity';
import { Incident } from './incidents/entities/incident.entity';

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
        entities: [Student, Incident],
        synchronize: true, // ⚠️ Solo para desarrollo
      }),
    }),
    AuthModule,
    StudentsModule,
    IncidentsModule,
    CoursesModule,
  ],
})
export class AppModule {}
