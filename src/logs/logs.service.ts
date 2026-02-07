import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogsService {
  constructor(private prisma : PrismaService) {}

  async findAll () {
    return this.prisma.activityLog.findMany({
      orderBy : {createdAt : 'desc'},
      take : 50
    })
  }

}
