import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ description: 'Description of the UserDto schema' })
export class UserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    enum: ['guest', 'admin'],
  })
  @IsEnum(['guest', 'admin'], {
    message: 'Valid role required',
  })
  role: 'guest' | 'admin';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
