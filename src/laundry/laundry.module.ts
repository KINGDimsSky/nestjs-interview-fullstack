import { Module } from '@nestjs/common';
import { LaundryService } from './laundry.service';
import { LaundryController } from './laundry.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CustomersModule } from 'src/customers/customers.module';


@Module({
  imports: [PrismaModule, CustomersModule],
  controllers: [LaundryController],
  providers: [LaundryService],
})
export class LaundryModule {}
