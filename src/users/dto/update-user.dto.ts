import { ApiSchema, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

@ApiSchema({ description: 'Description of the UpdateUserDto schema' })
export class UpdateUserDto extends PartialType(CreateUserDto) {}
