import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from '@src/customers/dto/create-customer.dto';
import { CustomerDto } from '@src/customers/dto/customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;

  const mockCustomersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomersService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* *
   * Data
   * */

  const requestData = {
    name: 'Chris',
    email: 'chris@email.com',
    type: 'individual',
    phones: [],
    addresses: [],
  } as CreateCustomerDto;

  type RecordFromDbDto = {
    id: number;
    name: string;
    type: 'individual' | 'business' | 'government' | 'institution';
    email: string;
    phones: string[];
    addresses: object[];
    createdAt: Date;
    updatedAt: Date;
  };

  const recordFromDb = {
    id: 1,
    name: requestData.name,
    email: requestData.email,
    type: requestData.type,
    phones: requestData.phones,
    addresses: requestData.addresses,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as RecordFromDbDto;

  const responseData = {
    id: recordFromDb.id,
    name: recordFromDb.name,
    email: recordFromDb.email,
    type: recordFromDb.type,
    phones: recordFromDb.phones,
    addresses: recordFromDb.addresses,
    createdAt: recordFromDb.createdAt,
    updatedAt: recordFromDb.updatedAt,
  } as CustomerDto;

  /* *
   * Tests by Arrange-Act-Assert pattern
   * */

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => Should create a new customer by a given data', async () => {
    const createCustomerDto = requestData;
    const customerDto = responseData;
    jest.spyOn(mockCustomersService, 'create').mockReturnValue(customerDto);

    const result = await controller.create(createCustomerDto);

    expect(result).toEqual(customerDto);
    expect(mockCustomersService.create).toBeCalled();
    expect(mockCustomersService.create).toBeCalledWith(createCustomerDto);
  });

  it('findAll => Should return an array of customer', async () => {
    const customerDtos = [responseData];
    jest.spyOn(mockCustomersService, 'findAll').mockReturnValue(customerDtos);

    const result = await controller.findAll();

    expect(result).toEqual(customerDtos);
    expect(mockCustomersService.findAll).toBeCalled();
  });

  it('findOne => Should find a customer by a given id and return its data', async () => {
    const customerDto = responseData;
    const id = String(customerDto.id);
    jest.spyOn(mockCustomersService, 'findOne').mockReturnValue(customerDto);

    const result = await controller.findOne(id);

    expect(result).toEqual(customerDto);
    expect(mockCustomersService.findOne).toBeCalled();
    expect(mockCustomersService.findOne).toBeCalledWith(+id);
  });

  it('update => Should find a customer by a given id and update its data', async () => {
    const updateCustomerDto = requestData;
    const customerDto = responseData;
    const id = String(customerDto.id);
    jest.spyOn(mockCustomersService, 'update').mockReturnValue(customerDto);

    const result = await controller.update(id, updateCustomerDto);

    expect(result).toEqual(customerDto);
    expect(mockCustomersService.update).toBeCalled();
    expect(mockCustomersService.update).toBeCalledWith(+id, updateCustomerDto);
  });

  it('remove => Should find a customer by a given id, remove and then return Number of affected rows', async () => {
    const customerDto = responseData;
    const id = String(customerDto.id);
    jest.spyOn(mockCustomersService, 'remove').mockReturnValue(customerDto);

    const result = await controller.remove(id);

    expect(result).toEqual(customerDto);
    expect(mockCustomersService.remove).toBeCalled();
    expect(mockCustomersService.remove).toBeCalledWith(+id);
  });
});
