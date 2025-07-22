import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '@src/database/database.service';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerDto } from './dto/customer.dto';

describe('CustomersService', () => {
  let service: CustomersService;

  const mockDatabaseService = {
    customer: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
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
    expect(service).toBeDefined();
  });

  it('create => Should create a new customer and return its data', async () => {
    const createCustomerDto = requestData;
    const customerFromDb = recordFromDb;
    const customerDto = responseData;
    mockDatabaseService.customer.create.mockResolvedValue(customerFromDb);

    const result = await service.create(createCustomerDto);

    expect(result).toEqual(customerDto);
    expect(mockDatabaseService.customer.create).toBeCalled();
  });

  it('update => Should update an existing customer and return its data', async () => {
    const updatedName = `Updated ${requestData.name}`;
    const updateCustomerDto = { name: updatedName };
    const customerFromDb = recordFromDb;
    const customerDto = responseData;
    customerFromDb.name = updatedName;
    customerDto.name = updatedName;
    mockDatabaseService.customer.update.mockResolvedValue(customerFromDb);

    const result = await service.update(customerFromDb.id, updateCustomerDto);

    expect(result).toEqual(customerDto);
    expect(mockDatabaseService.customer.update).toBeCalled();
  });

  it('findAll => Should return an array of customers', async () => {
    const customerDto = responseData;
    const customers: CustomerDto[] = [customerDto];
    mockDatabaseService.customer.findMany.mockResolvedValue(customers);

    const result = await service.findAll();

    expect(result).toEqual(customers);
    expect(mockDatabaseService.customer.findMany).toBeCalled();
  });

  it('findOne => Should find a customer by a given id and return its data', async () => {
    const customerDto = responseData;
    const customerFromDb = recordFromDb;
    const id = customerFromDb.id;
    mockDatabaseService.customer.findUnique.mockResolvedValue(customerFromDb);

    const result = await service.findOne(id);

    expect(result).toEqual(customerDto);
    expect(mockDatabaseService.customer.findUnique).toBeCalled();
    expect(mockDatabaseService.customer.findUnique).toBeCalledWith({
      where: { id },
      include: {
        phones: true,
        addresses: true,
      },
    });
  });

  it('remove => Should find a customer by a given id, remove and then return its data', async () => {
    const customerDto = responseData;
    const customerFromDb = recordFromDb;
    const id = customerFromDb.id;
    mockDatabaseService.customer.findUnique.mockResolvedValue(customerFromDb);
    mockDatabaseService.customer.delete.mockResolvedValue(customerFromDb);

    const result = await service.remove(id);

    expect(result).toEqual(customerDto);
    expect(mockDatabaseService.customer.delete).toBeCalled();
    expect(mockDatabaseService.customer.delete).toBeCalledWith({
      where: { id },
    });
  });
});
