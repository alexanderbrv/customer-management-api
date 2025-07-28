import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CustomersModule } from '@src/customers/customers.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from '@src/customers/dto/create-customer.dto';
import { PrismaClient } from '@generated/prisma/client';

describe('Customers (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();

  async function clearDatabase() {
    await prisma.address.deleteMany();
    await prisma.phone.deleteMany();
    await prisma.customer.deleteMany();
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CustomersModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    await clearDatabase();
  });

  let id;

  const createCustomerDto: CreateCustomerDto = {
    name: 'New Customer',
    email: 'new-customer@mail.com',
    type: 'business',
    phones: ['656565656565'],
    addresses: [
      {
        countryId: 4,
        settlementId: 4,
        street: 'street',
        building: 'building',
        flat: '32',
        zipcode: '552',
      },
    ],
  };

  it(`/POST api/customers`, () => {
    return request(app.getHttpServer())
      .post('/customers')
      .set('Accept', 'application/json')
      .send(createCustomerDto)
      .expect(({ body }) => {
        id = body.id;
        expect(body.name).toEqual(createCustomerDto.name);
        expect(body.email).toEqual(createCustomerDto.email);
        expect(body.type).toEqual(createCustomerDto.type);
        expect(body.phones).toEqual(createCustomerDto.phones);

        const address = body.addresses[0];
        const createAddress = createCustomerDto.addresses[0];
        expect(address.street).toEqual(createAddress.street);
        expect(address.building).toEqual(createAddress.building);
        expect(address.flat).toEqual(createAddress.flat);
        expect(address.zipcode).toEqual(createAddress.zipcode);
      })
      .expect(HttpStatus.CREATED);
  });

  it(`/GET api/customers`, () => {
    return request(app.getHttpServer())
      .get('/customers')
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body[0].name).toEqual(createCustomerDto.name);
        expect(body[0].email).toEqual(createCustomerDto.email);
        expect(body[0].type).toEqual(createCustomerDto.type);
        expect(body[0].phones).toEqual(createCustomerDto.phones);
      })
      .expect(HttpStatus.OK);
  });

  it(`/GET api/customers/:id`, () => {
    return request(app.getHttpServer())
      .get(`/customers/${id}`)
      .set('Accept', 'application/json')
      .expect(({ body }) => {
        expect(body.name).toEqual(createCustomerDto.name);
        expect(body.email).toEqual(createCustomerDto.email);
        expect(body.type).toEqual(createCustomerDto.type);
        expect(body.phones).toEqual(createCustomerDto.phones);
      })
      .expect(HttpStatus.OK);
  });

  it(`/PATCH api/customers/:id`, () => {
    createCustomerDto.name = 'Updated Name';

    return request(app.getHttpServer())
      .patch(`/customers/${id}`)
      .set('Accept', 'application/json')
      .send({ name: createCustomerDto.name })
      .expect(({ body }) => {
        expect(body.name).toEqual(createCustomerDto.name);
      })
      .expect(HttpStatus.OK);
  });

  it(`/DELETE api/customers/:id`, () => {
    return request(app.getHttpServer())
      .delete(`/customers/${id}`)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await clearDatabase();
    await app.close();
  });
});
