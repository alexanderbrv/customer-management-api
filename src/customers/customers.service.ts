import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerPrismaAdapter } from './adapters/customer-prisma.adapter';
import { OptionalCustomerTypeEnumDto } from './dto/enums/optional-customer-type-enum.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const data = CustomerPrismaAdapter.toPrismaCreate(createCustomerDto);

    const customer = await this.databaseService.customer.create({
      data,
      include: {
        phones: true,
        addresses: true,
      },
    });

    return CustomerPrismaAdapter.fromPrisma(customer);
  }

  async findAll(type?: OptionalCustomerTypeEnumDto) {
    const args: any = {
      include: {
        phones: true,
        addresses: true,
      },
    };
    if (type) {
      args.where = {
        type: type.type,
      };
    }

    const customers = await this.databaseService.customer.findMany(args);

    return CustomerPrismaAdapter.fromPrismaMany(customers);
  }

  async findOne(id: number) {
    const customer = await this.databaseService.customer.findUnique({
      where: {
        id,
      },
      include: {
        phones: true,
        addresses: true,
      },
    });

    return CustomerPrismaAdapter.fromPrisma(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const data = CustomerPrismaAdapter.toPrismaUpdate(updateCustomerDto);

    const customer = await this.databaseService.customer.update({
      where: {
        id,
      },
      data,
    });

    return CustomerPrismaAdapter.fromPrisma(customer);
  }

  async remove(id: number) {
    const isCustomerExist = await this.databaseService.customer.findUnique({
      where: { id },
    });
    if (!isCustomerExist) {
      return { message: 'An attempt to delete non existing Customer.' };
    }

    const customer = await this.databaseService.customer.delete({
      where: { id },
    });

    return CustomerPrismaAdapter.fromPrisma(customer);
  }
}
