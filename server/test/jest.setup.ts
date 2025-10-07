// test/setup/jest.setup.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Global setup
beforeAll(async () => {
  // Test database connection
  try {
    await prisma.$connect();
    console.log('Test database connected successfully');
  } catch (error) {
    console.error('Failed to connect to test database:', error);
    throw error;
  }
}, 30000); // 30 second timeout

// Global teardown
afterAll(async () => {
  await prisma.$disconnect();
});