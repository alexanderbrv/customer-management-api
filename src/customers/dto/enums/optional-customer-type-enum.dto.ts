import { ApiSchema, PartialType } from '@nestjs/swagger';
import { CustomerTypeEnumDto } from './customer-type-enum.dto';

@ApiSchema({ description: 'Description of the OptionalCustomerTypeEnumDto schema' })
export class OptionalCustomerTypeEnumDto extends PartialType(
  CustomerTypeEnumDto,
) {}
