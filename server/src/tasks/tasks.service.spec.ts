import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../configs/database-config/prisma.service';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

let service: TasksService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      TasksService,
      { provide: PrismaService, useValue: mockPrismaService },
    ],
  }).compile();

  service = module.get<TasksService>(TasksService);
});

describe('createTask', () => {
  it('should create a task successfully', async () => {
    const dto = { title: 'Test', description: 'desc' };
    const mockTask = {
      id: '1',
      ...dto,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockPrismaService.task.create.mockResolvedValue(mockTask);

    const result = await service.createTask(dto);
    expect(result).toEqual(mockTask);
    expect(mockPrismaService.task.create).toHaveBeenCalledWith({ data: dto });
  });

  it('should throw InternalServerErrorException on failure', async () => {
    mockPrismaService.task.create.mockRejectedValue(new Error('DB error'));

    await expect(service.createTask({ title: 'Test' })).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});

describe('findRecentTasks', () => {
  it('should return recent tasks with default limit 5', async () => {
    const tasks = Array(5)
      .fill({})
      .map((_, i) => ({
        id: `${i}`,
        title: `Task${i}`,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    mockPrismaService.task.findMany.mockResolvedValue(tasks);

    const result = await service.findRecentTasks();
    expect(result.length).toBe(5);
    expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
      where: { isCompleted: false },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  });
});

describe('markTaskAsCompleted', () => {
  it('should mark a task as completed', async () => {
    const id = '1';
    const task = {
      id,
      title: 'Test',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedTask = { ...task, isCompleted: true };

    mockPrismaService.task.findUnique.mockResolvedValue(task);
    mockPrismaService.task.update.mockResolvedValue(updatedTask);

    const result = await service.markTaskAsCompleted(id);
    expect(result.isCompleted).toBe(true);
    expect(mockPrismaService.task.update).toHaveBeenCalledWith({
      where: { id },
      data: { isCompleted: true },
    });
  });

  it('should throw NotFoundException if task does not exist', async () => {
    mockPrismaService.task.findUnique.mockResolvedValue(null);
    await expect(service.markTaskAsCompleted('1')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException if task is already completed', async () => {
    const task = { id: '1', title: 'Test', isCompleted: true };
    mockPrismaService.task.findUnique.mockResolvedValue(task);

    await expect(service.markTaskAsCompleted('1')).rejects.toThrow(
      BadRequestException,
    );
  });
});
