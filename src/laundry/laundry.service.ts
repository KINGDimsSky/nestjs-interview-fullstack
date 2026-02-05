import { Injectable } from '@nestjs/common';
import { CreateLaundryDto } from './dto/create-laundry.dto';
import { UpdateLaundryDto } from './dto/update-laundry.dto';
import {PrismaService} from 'src/prisma/prisma.service';
import { Transaction } from '@prisma/client'; 
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class LaundryService {
  constructor(
    private prisma: PrismaService,
    private customerService : CustomersService
   ) {}

  async getCustomerForForm() {
    return this.customerService.findAll();
  }

  async findAll(searchQuery ?: string) : Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where : searchQuery ? {
        customer : {
          name : {
            contains : searchQuery,
            mode : 'insensitive'
          }
        } 
      } : {},

      include : {customer : true },
      orderBy : { createdAt : 'desc' }
    });
  }

  async findOne (idTransaction : number) {
    const transaction = await this.prisma.transaction.findUnique({
      where : {
        id : idTransaction
      },
      include : {
        customer : true
      }
    })

    return transaction;
  }

  async create(data: any) {
  return this.prisma.transaction.create({
    data: {
      weight: parseFloat(data.weight), 
      price: parseFloat(data.price),   
      status: data.status,
      customerId: parseInt(data.customerId), 
    },
  });
}

  async remove (id : number) {
    return this.prisma.transaction.delete({
      where : {
        id : +id,
      }
    })
  }
}


