import { IsEnum } from 'class-validator';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({ description: 'Description of the UserRoleDto schema' })
export class UserRoleDto {
  @IsEnum(['guest', 'admin'], {
    message: 'valid role required',
  })
  role: 'guest' | 'admin';
}
