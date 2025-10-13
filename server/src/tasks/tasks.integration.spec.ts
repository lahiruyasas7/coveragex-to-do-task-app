import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/configs/database-config/prisma.service';
import * as request from 'supertest';

describe('TasksModule Integration Test', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createdTaskId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    // Use same pipes as production
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    prisma = app.get(PrismaService);

    // Connect Prisma & clean DB before starting
    await prisma.$connect();
    await prisma.task.deleteMany();
  }, 30000);

  afterAll(async () => {
    await prisma.task.deleteMany();
    await prisma.$disconnect();
    await app.close();
  });

  // CREATE TASK TESTS
  describe('POST /tasks/create', () => {
    it('should create a new task successfully', async () => {
      const dto = { title: 'Integration Test Task', description: 'Test desc' };

      const res = await request(app.getHttpServer())
        .post('/tasks/create')
        .send(dto)
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(dto.title);
      expect(res.body.description).toBe(dto.description);
      expect(res.body.isCompleted).toBe(false);

      createdTaskId = res.body.id;
    });

    it('should fail validation if title is missing', async () => {
      await request(app.getHttpServer())
        .post('/tasks/create')
        .send({ description: 'no title' })
        .expect(400);
    });
  });

  // GET RECENT TASKS TESTS
  describe('GET /tasks', () => {
    beforeEach(async () => {
      await prisma.task.deleteMany();
      await prisma.task.createMany({
        data: [
          { title: 'Task 1', description: 'desc 1', isCompleted: false },
          { title: 'Task 2', description: 'desc 2', isCompleted: false },
          { title: 'Task 3', description: 'desc 3', isCompleted: false },
        ],
      });
    });

    it('should return most recent tasks (default 5)', async () => {
      const res = await request(app.getHttpServer()).get('/tasks').expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(3);
      expect(res.body[0]).toHaveProperty('title');
    });

    it('should return custom number of tasks with limit param', async () => {
      const res = await request(app.getHttpServer())
        .get('/tasks?limit=2')
        .expect(200);

      expect(res.body.length).toBe(2);
    });
  });

  // MARK AS COMPLETED TESTS
  describe('PATCH /tasks/:id/complete', () => {
    let taskId: string;

    beforeEach(async () => {
      const task = await prisma.task.create({
        data: {
          title: 'Task to complete',
          description: 'desc',
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
