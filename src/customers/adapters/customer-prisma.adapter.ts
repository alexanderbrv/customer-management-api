import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerDto } from '../dto/customer.dto';
import { Prisma } from '@generated/prisma';

export class CustomerPrismaAdapter {
  static toPrismaCreate(dto: CreateCustomerDto): Prisma.CustomerCreateInput {
    const data: any = {
      email: dto.email,
      name: dto.name,
      type: dto.type,
    };

    if (!!dto.phones?.length && dto.phones[0]) {
      data.phones = {
        create: {
          phone: dto.phones[0],
        },
      };
    }

    if (!!dto.addresses?.length && dto.addresses[0]) {
      data.addresses = {
        create: dto.addresses[0],
      };
    }

    return data;
  }

  static toPrismaUpdate(dto: UpdateCustomerDto): Prisma.CustomerUpdateInput {
    const entity: Prisma.CustomerUpdateInput = {};
    if (dto.email) entity.email = dto.email;
    if (dto.name) entity.name = dto.name;
    if (dto.type) entity.type = dto.type;

    return entity;
  }

  static fromPrisma(entity: any): CustomerDto {
    const dto = {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      email: entity.email,
      phones: [],
      addresses: [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
    if (!!entity.phones?.length) {
      entity.phones.forEach((phoneData) => {
        dto.phones.push(phoneData.phone);
      });
    }
    if (!!entity.addresses?.length) {
      entity.addresses.forEach((addressData) => {
        const addressDto = {
          id: addressData.id,
          countryId: addressData.countryId,
          settlementId: addressData.settlementId,
          street: addressData.street,
          building: addressData.building,
          block: addressData?.block,
          flat: addressData.flat,
          zipcode: addressData?.zipcode,
        };
        dto.addresses.push(addressDto);
      });
    }

    return dto;
  }

  static fromPrismaMany(entities: any): CustomerDto[] | [] {
    const dto = [];
    if (!!entities.length) {
      entities.forEach((entity) => {
        dto.push(CustomerPrismaAdapter.fromPrisma(entity));
      });
    }

    return dto;
  }
}
