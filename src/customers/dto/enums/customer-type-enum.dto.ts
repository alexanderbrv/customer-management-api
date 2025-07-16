import { IsEnum } from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ description: 'Description of the CustomerTypeEnumDto schema' })
export class CustomerTypeEnumDto {
  @ApiProperty({
    enum: ['individual', 'business', 'government', 'institution'],
  })
  @IsEnum(['individual', 'business', 'government', 'institution'], {
    message: 'Valid type required',
  })
  type: 'individual' | 'business' | 'government' | 'institution';
}
