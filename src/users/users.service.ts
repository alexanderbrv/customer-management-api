import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/database.service';
import { UserPrismaAdapter } from './adapters/user-prisma.adapter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const data = UserPrismaAdapter.toPrismaCreate(createUserDto);
    const user = await this.databaseService.user.create({
      data,
    });

    return UserPrismaAdapter.fromPrisma(user);
  }

  async findAll(role?: 'guest' | 'admin') {
    const args: any = {};
    if (role) {
      args.where = {
        role: role,
      };
    }

    const users = await this.databaseService.user.findMany(args);

    return UserPrismaAdapter.fromPrismaMany(users);
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    return UserPrismaAdapter.fromPrisma(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = UserPrismaAdapter.toPrismaUpdate(updateUserDto);
    const user = await this.databaseService.user.update({
      where: {
        id,
      },
      data,
    });

    return UserPrismaAdapter.fromPrisma(user);
  }

  async remove(id: number) {
    const user = await this.databaseService.user.delete({
      where: {
        id,
      },
    });

    return UserPrismaAdapter.fromPrisma(user);
  }

  /*
   Auth Methods
   */

  async authByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    return {
      id: user.id,
      name: user.name,
      password: user?.password ?? '',
    };
  }

  async userInfoByRefreshToken(token: string) {
    const user = await this.databaseService.user.findFirst({
      where: {
        refreshToken: token,
      },
    });

    if (!user) return;

    return {
      id: user.id,
      name: user.name,
    };
  }

  async updateRefreshToken(id: number, token: string | null) {
    const user = await this.databaseService.user.update({
      where: {
        id,
      },
      data: { refreshToken: token },
    });

    return {
      refreshTokenIsUpdated: token === user.refreshToken,
    };
  }
}
