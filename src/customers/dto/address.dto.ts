import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ description: 'Description of the AddressDto schema' })
export class AddressDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  countryId: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  settlementId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  building: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  block?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  flat: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  zipcode?: string;
}
