import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import methodOverride = require('method-override');
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

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

  app.useGlobalFilters(new GlobalExceptionFilter());
  

  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });
  // --

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();


