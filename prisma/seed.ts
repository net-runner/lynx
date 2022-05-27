const { PrismaClient } = require('@prisma/client');
const { v4 } = require('uuid');
const db = new PrismaClient();

const load = async () => {
  try {
  } catch (e) {
    console.error('There was an error while seeding');
    console.error(e);
    process.exit(1);
  } finally {
    console.log('Successfully seeded database. Closing connection.');
    await db.$disconnect();
  }
};
load();
