// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      { title: 'Seed Task 1', description: 'desc', isCompleted: false },
      { title: 'Seed Task 2', description: 'desc', isCompleted: false },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
