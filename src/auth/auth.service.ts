import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoggedInDto } from '@src/auth/dto/logged-in.dto';
import { RegisterDto } from '@src/auth/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);
    return this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashPassword,
    });
  }

  async login(
    email: string,
    pass: string,
    response: Response,
  ): Promise<LoggedInDto> {
    const user = await this.usersService.authByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const refreshTokenPayload = { name: user.name };
    const refreshToken = await this.jwtService.signAsync(
      refreshTokenPayload,
      jwtConstants.refreshToken.jwtOptions,
    );
    response.cookie(
      'jwt',
      refreshToken,
      jwtConstants.refreshToken.cookieSettings,
    );
    await this.usersService.updateRefreshToken(user.id, refreshToken);

    const accessTokenPayload = { sub: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
    };
  }

  async refresh(jwt: string): Promise<LoggedInDto> {
    if (!jwt) {
      throw new BadRequestException();
    }
    const user = await this.usersService.userInfoByRefreshToken(jwt);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.verifyAsync(jwt, {
      secret: jwtConstants.refreshSecret,
    });
    if (user.name !== payload.name) {
      throw new UnauthorizedException();
    }
    const accessTokenPayload = { sub: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
    };
  }

  async logout(jwt: string, response) {
    // On client, also delete 'access_token'

    if (!jwt) {
      response.status(204);
      return;
    }
    const user = await this.usersService.userInfoByRefreshToken(jwt);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.verifyAsync(jwt, {
      secret: jwtConstants.refreshSecret,
    });
    if (user.name !== payload.name) {
      throw new UnauthorizedException();
    }
    await this.usersService.updateRefreshToken(user.id, null);
    response.clearCookie('jwt', jwtConstants.refreshToken.cookieSettings);
    response.status(204);
    return;
  }
}
