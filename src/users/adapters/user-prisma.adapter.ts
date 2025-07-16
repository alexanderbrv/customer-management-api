import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { Prisma } from '@generated/prisma';

export class UserPrismaAdapter {
  static toPrismaCreate(dto: CreateUserDto): Prisma.UserCreateInput {
    return {
      name: dto.name,
      email: dto.email,
      role: dto.role,
      password: dto.password,
    };
  }

  static toPrismaUpdate(dto: UpdateUserDto): Prisma.UserUpdateInput {
    const entity: Prisma.UserUpdateInput = {};
    if (dto.email) entity.email = dto.email;
    if (dto.name) entity.name = dto.name;
    if (dto.role) entity.role = dto.role;
    if (dto.password) entity.password = dto.password;

    return entity;
  }

  static fromPrisma(entity: any): UserDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static fromPrismaMany(entities: any): UserDto[] | [] {
    const dto = [];
    if (!!entities.length) {
      entities.forEach((entity) => {
        dto.push(UserPrismaAdapter.fromPrisma(entity));
      });
    }

    return dto;
  }
}
