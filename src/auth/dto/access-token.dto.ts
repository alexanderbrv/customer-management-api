import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ description: 'Description of the AccessTokenDto schema' })
export class AccessTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
