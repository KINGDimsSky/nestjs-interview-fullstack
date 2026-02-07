import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import methodOverride = require('method-override');
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';
import { UserInterceptor } from './common/interceptors/user.interceptor';
import { PrismaService } from './prisma/prisma.service';
import { AuditLoggingInterceptor } from './common/interceptors/logging.interceptor';

const hbs = require('hbs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.use(methodOverride("_method"));
  app.useGlobalPipes(new ValidationPipe({
    transform : true,
    whitelist : true,
  }))


  const prismaService = app.get(PrismaService);
  app.useGlobalInterceptors(new UserInterceptor(), new AuditLoggingInterceptor(prismaService));

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(cookieParser());

  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();


