import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerPrismaAdapter } from './adapters/customer-prisma.adapter';
import { OptionalCustomerTypeEnumDto } from './dto/enums/optional-customer-type-enum.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createCustomerDto: CreateCustomerDto) {
    const data = CustomerPrismaAdapter.toPrismaCreate(createCustomerDto);

    return this.databaseService.customer.create({
      data,
      include: {
        phones: true,
        addresses: true,
      },
    });
  }

  findAll(type?: OptionalCustomerTypeEnumDto) {
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

    return this.databaseService.customer.findMany(args);
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

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const data = CustomerPrismaAdapter.toPrismaUpdate(updateCustomerDto);

    return this.databaseService.customer.update({
      where: {
        id,
      },
      data,
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
