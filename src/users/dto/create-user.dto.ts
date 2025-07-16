import { IsNotEmpty, IsEnum, IsEmail, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ description: 'Description of the CreateUserDto schema' })
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    enum: ['guest', 'admin'],
  })
  @IsEnum(['guest', 'admin'], {
    message: 'Valid role required',
  })
  role?: 'guest' | 'admin';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
