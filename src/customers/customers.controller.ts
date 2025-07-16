import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CustomerDto } from './dto/customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { OptionalCustomerTypeEnumDto } from './dto/enums/optional-customer-type-enum.dto';

@Controller('customers')
@ApiTags('Customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiBody({ type: CreateCustomerDto })
  @ApiCreatedResponse({ type: CustomerDto })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiQuery({ name: 'type', required: false })
  @ApiOkResponse({ type: [CustomerDto] })
  findAll(@Query() type?: OptionalCustomerTypeEnumDto) {
    return this.customersService.findAll(type);
  }

  @Get(':id')
  @ApiOkResponse({ type: CustomerDto })
  async findOne(@Param('id') id: string) {
    return await this.customersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCustomerDto })
  @ApiOkResponse({ type: CustomerDto })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CustomerDto })
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
