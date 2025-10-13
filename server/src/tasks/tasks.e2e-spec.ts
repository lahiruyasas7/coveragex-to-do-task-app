import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { PrismaService } from '../configs/database-config/prisma.service';

describe('TasksModule (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createdTaskId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    // Enable validation pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    // Get PrismaService instance
    prisma = app.get(PrismaService);

    // Verify Prisma connection
    try {
      await prisma.$connect();
      console.log('Prisma connected successfully');
    } catch (error) {
      console.error('Prisma connection failed:', error);
      throw error;
    }

    // Clean DB before all tests
    await prisma.task.deleteMany();
  }, 30000); // 30 second timeout

  beforeEach(async () => {
    // Clean up before each test
    if (prisma) {
      await prisma.task.deleteMany();
    }
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.task.deleteMany();
      await prisma.$disconnect();
    }
    if (app) {
      await app.close();
    }
  });

  describe('POST /tasks/create', () => {
    it('should create a new task', async () => {
      const createTaskDto = {
        title: 'Integration Test Task',
        description: 'Testing create endpoint',
      };

      const res = await request(app.getHttpServer())
        .post('/tasks/create')
        .send(createTaskDto)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(createTaskDto.title);
      expect(res.body.description).toBe(createTaskDto.description);
      expect(res.body.isCompleted).toBe(false);

      createdTaskId = res.body.id;
    });

    it('should return 400 if title is missing', async () => {
      const invalidDto = {
        description: 'Missing title',
      };

      await request(app.getHttpServer())
        .post('/tasks/create')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('GET /tasks', () => {
    beforeEach(async () => {
      // Create test tasks
      await prisma.task.createMany({
        data: [
          {
            title: 'Task 1',
            description: 'Description 1',
            isCompleted: false,
          },
          {
            title: 'Task 2',
            description: 'Description 2',
            isCompleted: false,
          },
          {
            title: 'Task 3',
            description: 'Description 3',
            isCompleted: false,
          },
        ],
      });
    });

    it('should return most recent tasks by default', async () => {
      const res = await request(app.getHttpServer()).get('/tasks').expect(200);

      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('should return custom number of tasks when limit is set', async () => {
      const res = await request(app.getHttpServer())
        .get('/tasks?limit=2')
        .expect(200);

      expect(res.body.length).toBe(2);
    });
  });

  describe('PATCH /tasks/:id/complete', () => {
    let taskId: string;

    beforeEach(async () => {
      // Create a fresh task for each test
      const task = await prisma.task.create({
        data: {
          title: 'Task to complete',
          description: 'This task will be marked as completed',
          isCompleted: false,
        },
      });
      taskId = task.id;
    });

    it('should mark a task as completed', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/tasks/${taskId}/complete`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.isCompleted).toBe(true);
    });

    it('should return 404 if task does not exist', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';

      await request(app.getHttpServer())
        .patch(`/tasks/${nonExistentId}/complete`)
        .expect(404);
    });
  });
});
