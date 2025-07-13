import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.signIn(
      signInDto.email,
      signInDto.password,
      response,
    );
  }

  @Get('refresh')
  refresh(@Req() request: Request) {
    const jwt = request.cookies['jwt'] ?? '';
    return this.authService.refresh(jwt);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = request.cookies['jwt'] ?? '';
    return this.authService.logout(jwt, response);
  }
}
