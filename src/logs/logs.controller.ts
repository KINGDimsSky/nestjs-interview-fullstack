import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Render } from '@nestjs/common';
import { LogsService } from './logs.service';
import { JwtAuthGuard } from 'src/middlewares/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @Render('logs/index')
  async findAll() {
    const logs = await this.logsService.findAll();
    return {
      title: 'Audit Trail / Activity Logs',
      logs: logs,
    };
  }
}

