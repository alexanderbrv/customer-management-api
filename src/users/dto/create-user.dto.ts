import { IsNotEmpty, IsEnum, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['intern', 'engineer', 'admin'], {
    message: 'Valid role required',
  })
  role: 'intern' | 'engineer' | 'admin';
}
