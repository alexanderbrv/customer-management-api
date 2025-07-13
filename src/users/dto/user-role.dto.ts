import { IsEnum } from 'class-validator';

export class UserRoleDto {
  @IsEnum(['guest', 'admin'], {
    message: 'valid role required',
  })
  role: 'guest' | 'admin';
}
