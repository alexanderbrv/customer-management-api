import { PartialType } from '@nestjs/mapped-types';
import { CustomerTypeEnumDto } from './customer-type-enum.dto';

export class OptionalCustomerTypeEnumDto extends PartialType(
  CustomerTypeEnumDto,
) {}
