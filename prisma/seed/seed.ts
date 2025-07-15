import { PrismaClient } from '@generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  seedCountries();
  seedSettlements();
}

async function seedCountries() {
  const seeds = await prisma.country.createMany({
    data: [
      {
        country: 'Ukraine',
        countryCode: 'UA',
      },
      {
        country: 'United Kingdom',
        countryCode: 'GB',
      },
      {
        country: 'Germany',
        countryCode: 'DE',
      },
      {
        country: 'Poland',
        countryCode: 'PL',
      },
      {
        country: 'United States',
        countryCode: 'US',
      },
    ],
  });

  console.log('Countries created:', seeds);
}

async function seedSettlements() {
  const seeds = await prisma.settlement.createMany({
    data: [
      {
        settlement: 'Kyiv',
      },
      {
        settlement: 'Lviv',
      },
      {
        settlement: 'Detroit',
      },
      {
        settlement: 'New York City',
      },
      {
        settlement: 'Berlin',
      },
      {
        settlement: 'Warsaw',
      },
    ],
  });

  console.log('Settlements created:', seeds);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
