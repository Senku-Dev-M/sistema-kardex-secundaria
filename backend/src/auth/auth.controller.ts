import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('health')
  health() {
    return { ok: true, scope: 'auth' };
  }
}
