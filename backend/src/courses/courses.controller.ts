import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get('health')
  health() {
    return { ok: true, scope: 'courses' };
  }
}
