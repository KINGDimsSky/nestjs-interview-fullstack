import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomerDto) {
    return this.prisma.customer.create({
      data : {
        name : data.name,
        phone : data.phone,
        address : data.address
      }
    })
  }

  findAll() {
    return this.prisma.customer.findMany({
      orderBy : { name : 'asc'}
    })
  }


  async findOne(id: number) {
    const oneCustomer = await this.prisma.customer.findUnique({
      where : {
        id : +id
      }
    })

    return oneCustomer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const editedCustomer = await this.prisma.customer.update({
      where : {
        id : +id
      },
      data : {
        name : updateCustomerDto.name,
        phone : updateCustomerDto.phone,
        address : updateCustomerDto.address
      }
    })

    return editedCustomer;
  }

  remove(id: number) {
    return this.prisma.customer.delete({
      where : {
        id : +id
      }
    })
  }
}
