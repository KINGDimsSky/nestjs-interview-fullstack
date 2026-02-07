import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LaundryModule } from './laundry/laundry.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [LaundryModule, PrismaModule, CustomersModule, AuthModule, LogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
