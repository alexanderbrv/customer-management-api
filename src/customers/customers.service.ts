import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import { Prisma } from 'generated/prisma';
// import { CreateCustomerDto } from './dto/create-customer.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createCustomerDto: Prisma.CustomerCreateInput) {
    return this.databaseService.customer.create({
      data: createCustomerDto,
    });
  }

  findAll(type?: 'individual' | 'business' | 'government' | 'institution') {
    if (type)
      return this.databaseService.customer.findMany({
        where: {
          type: type,
        },
      });

    return this.databaseService.customer.findMany();
  }

  findOne(id: number) {
    return this.databaseService.customer.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCustomerDto: Prisma.CustomerUpdateInput) {
    return this.databaseService.customer.update({
      where: {
        id,
      },
      data: updateCustomerDto,
    });
  }

  remove(id: number) {
    return this.databaseService.customer.delete({
      where: {
        id,
      },
    });
  }
}
