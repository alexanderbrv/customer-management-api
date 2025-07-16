import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { RegisterDto } from './dto/register.dto';
import { LoggedInDto } from './dto/logged-in.dto';
import { UserDto } from '@src/users/dto/user.dto';
import { Response, Request } from 'express';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ type: UserDto })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiBearerAuth()
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: LoggedInDto })
  async login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(
      signInDto.email,
      signInDto.password,
      response,
    );
  }

  @Get('refresh')
  @ApiCookieAuth()
  @ApiOkResponse({ type: LoggedInDto })
  refresh(@Req() request: Request) {
    const jwt = request.cookies['jwt'] ?? '';
    return this.authService.refresh(jwt);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  @ApiNoContentResponse()
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = request.cookies['jwt'] ?? '';
    return this.authService.logout(jwt, response);
  }
}
