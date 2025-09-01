import { Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Roles(UserRole.TEACHER)
  @Get('courses/:id')
  incidentsByCourse(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ) {
    return this.reportsService.incidentsByCourse(id, req.user.teacherId);
  }
}
