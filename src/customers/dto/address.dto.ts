import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class AddressDto {
  @IsNumber()
  @IsNotEmpty()
  countryId: number;

  @IsNumber()
  @IsNotEmpty()
  settlementId: number;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  building: string;

  @IsString()
  @IsOptional()
  block?: string;

  @IsString()
  @IsNotEmpty()
  flat: string;

  @IsString()
  @IsOptional()
  zipcode?: string;
}
