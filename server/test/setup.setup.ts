// test/setup/setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function setupTestDatabase() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('This script should only run in test environment');
  }

  console.log('Setting up test database...');
  await prisma.$connect();

  // Optional: Run any test-specific seeds
  console.log('Test database setup complete');
}

export async function teardownTestDatabase() {
  await prisma.$disconnect();
}
