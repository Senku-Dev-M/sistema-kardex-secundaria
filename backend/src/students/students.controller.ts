import { Controller, Get } from '@nestjs/common';

@Controller('students')
export class StudentsController {
  @Get('health')
  health() {
    return { ok: true, scope: 'students' };
  }
}
