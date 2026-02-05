import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect, NotFoundException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('create')
  @Redirect('/customers')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
   await this.customersService.create(createCustomerDto);
  }

  @Get()
  @Render('customers')
  async findAll() {
    const customers = await this.customersService.findAll();

    return {
      title : 'Daftar Pelanggan',
      customers : customers,
    }
  }

  @Get('create')
  @Render('customers/create')
  async createCustomer() {
    const customers = await this.customersService.findAll();
    console.log ('Data pelanggan berhasil didapatkan', customers)

    return {
      message : 'Tambah Pelanggan Baru',
      customers
    }
  }
  

  @Get('edit/:id')
  @Render('customers/edit')
  async editCustomers (@Param('id') id : number ) {
    const customer = await this.customersService.findOne(+id);

    if (!customer) {
      throw new NotFoundException(`Pelanggan dengan ID ${id} tidak ditemukan`);

    }

    return {
      message : "Satu Pelanggan",
      customer 
    }
  }

  @Patch('update/:id')
  @Redirect('/customers')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    await this.customersService.update(+id, updateCustomerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Delete(':id')
  @Redirect('/customers')
  async remove(@Param('id') id: string) {
    return await this.customersService.remove(+id);
  }
}
