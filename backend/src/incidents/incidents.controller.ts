import { Controller, Get } from '@nestjs/common';

@Controller('incidents')
export class IncidentsController {
  @Get('health')
  health() {
    return { ok: true, scope: 'incidents' };
  }
}
