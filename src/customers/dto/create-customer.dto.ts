import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { CustomerTypeEnumDto } from './enums/customer-type-enum.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ description: 'Description of the CreateCustomerDto schema' })
export class CreateCustomerDto extends CustomerTypeEnumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  phones: string[];

  @ApiProperty({ type: [AddressDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}
