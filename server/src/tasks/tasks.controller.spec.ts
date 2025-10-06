import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const mockTasksService = {
  createTask: jest.fn(),
  findRecentTasks: jest.fn(),
  markTaskAsCompleted: jest.fn(),
};

let controller: TasksController;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [TasksController],
    providers: [{ provide: TasksService, useValue: mockTasksService }],
  }).compile();

  controller = module.get<TasksController>(TasksController);
});

it('should call service.createTask and return task', async () => {
  const dto = { title: 'Test', description: 'abc' };
  const task = { id: '1', ...dto, isCompleted: false };
  mockTasksService.createTask.mockResolvedValue(task);

  const result = await controller.create(dto);
  expect(result).toEqual(task);
  expect(mockTasksService.createTask).toHaveBeenCalledWith(dto);
});

it('should call service.markTaskAsCompleted and return success response', async () => {
  const updatedTask = { id: '12bcfca6-3f16-4c23-b964-da3d3392ba4d', title: 'Test', isCompleted: true };
  mockTasksService.markTaskAsCompleted.mockResolvedValue(updatedTask);

  const result = await controller.markAsCompleted('1');
  expect(result).toEqual({
    success: true,
    message: 'Task marked as completed',
    data: updatedTask,
  });
  expect(mockTasksService.markTaskAsCompleted).toHaveBeenCalledWith('1');
});
