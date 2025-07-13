import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import { Prisma } from '@generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  findAll(role?: 'guest' | 'admin') {
    if (role)
      return this.databaseService.user.findMany({
        where: {
          role: role,
        },
      });

    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findOneByRefreshToken(refreshToken: string) {
    return this.databaseService.user.findFirst({
      where: {
        refreshToken,
      },
    });
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      },
    });
  }
}
