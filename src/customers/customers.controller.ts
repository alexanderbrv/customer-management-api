import { Controller, Get, Post, Query, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Prisma } from 'generated/prisma';
// import { CreateCustomerDto } from './dto/create-customer.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: Prisma.CustomerCreateInput) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query('type') type?: 'individual' | 'business' | 'government' | 'institution') {
    return this.customersService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: Prisma.CustomerUpdateInput) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
