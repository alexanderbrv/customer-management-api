import { IsEnum } from 'class-validator';

export class CustomerTypeEnumDto {
  @IsEnum(['individual', 'business', 'government', 'institution'], {
    message: 'Valid type required',
  })
  type: 'individual' | 'business' | 'government' | 'institution';
}
