import { ApiSchema, PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

@ApiSchema({ description: 'Description of the UpdateCustomerDto schema' })
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
