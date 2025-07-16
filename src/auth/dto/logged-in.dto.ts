import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { AccessTokenDto } from './access-token.dto';

@ApiSchema({ description: 'Description of the LoggedInDto schema' })
export class LoggedInDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => AccessTokenDto)
  access_token: string;
}
