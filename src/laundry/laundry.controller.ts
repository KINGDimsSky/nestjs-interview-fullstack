import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect, Query, UseGuards } from '@nestjs/common';
import { LaundryService } from './laundry.service';
import { CreateLaundryDto } from './dto/create-laundry.dto';
import { UpdateLaundryDto } from './dto/update-laundry.dto';
import { JwtAuthGuard } from 'src/middlewares/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('laundry')
export class LaundryController {
  constructor(private readonly laundryService: LaundryService) {}

  @Get()
  @Render('laundry')
  async findAll(@Query('search') searchQuery ?: string) {
    const transactions = await this.laundryService.findAll(searchQuery);

    return {
      title : 'Dashboard Laundry',
      transactions : transactions,
      search : searchQuery
    };
  }

  @Get('create')
  @Render('laundry/create')
  async createPage() {
    const customers = await this.laundryService.getCustomerForForm();
    return {title : 'Tambah Pesanan Baru', customers}
  }

  @Get('edit/:id')
  @Render('laundry/edit')
  async editpage(@Param('id') id : number) {
    const transaction = await this.laundryService.findOne(+id);

    return {
      title : "Transaction Detail",
      transaction
    }
  }

  @Post()
  @Redirect('/laundry')
  async create(@Body() CreateLaundryDto: CreateLaundryDto) {
    await this.laundryService.create(CreateLaundryDto);
  }


  @Patch(":id")
  @Redirect('/laundry')
  async updateTransaction (@Param('id') id : number, @Body() updateLaundryDto : UpdateLaundryDto) {
    await this.laundryService.update(+id, updateLaundryDto)
  }

  @Delete(':id')
  @Redirect('/laundry')
  async deleteOneTransaction(@Param('id') id : number) {
    return await this.laundryService.remove(+id);
  }
}
