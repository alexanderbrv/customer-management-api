import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@src/auth/auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'role', required: false })
  @ApiOkResponse({ type: [UserDto] })
  findAll(@Query('role') role?: 'guest' | 'admin') {
    return this.usersService.findAll(role);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  getProfile(@Request() req) {
    return this.usersService.findOne(+req.user.sub);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
