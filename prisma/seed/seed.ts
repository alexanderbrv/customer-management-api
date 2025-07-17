import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  seedCountries();
  seedSettlements();
}

async function seedCountries() {
  const countriesData = [
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
  ];

  try {
    countriesData.forEach(async (item) => {
      await prisma.country.upsert({
        where: { country: item.country },
        update: {},
        create: {
          country: item.country,
          countryCode: item.countryCode,
        },
      });
    });
  } catch (error) {
    console.log('Countries Seeds has hailed.', error.message);
  }
  console.log('Countries created.');
}

async function seedSettlements() {
  const settlementsData = [
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
  ];

  try {
    settlementsData.forEach(async (item) => {
      await prisma.settlement.upsert({
        where: { settlement: item.settlement },
        update: {},
        create: { settlement: item.settlement },
      });
    });
  } catch (error) {
    console.log('Settlements Seeds has hailed.', error.message);
  }
  console.log('Settlements created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
