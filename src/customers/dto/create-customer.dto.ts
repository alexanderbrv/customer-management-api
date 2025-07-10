import { IsNotEmpty, IsEnum, IsEmail, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['individual', 'business', 'government', 'institution'], {
    message: 'Valid type required',
  })
  type: 'individual' | 'business' | 'government' | 'institution';
}
