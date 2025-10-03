import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/configs/database-config/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({
        data: dto,
      });

      return task;
    } catch (error) {
      this.logger.error(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  //find most recent 5 tasks by default. if limit is provided can be changed
  async findRecentTasks(limit = 5) {
    try {
      const result = await this.prisma.task.findMany({
        where: { isCompleted: false },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async markTaskAsCompleted(id: string) {
    try {
      // Check if task exists
      const existingTask = await this.prisma.task.findUnique({ where: { id } });
      if (!existingTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      if (existingTask.isCompleted) {
        throw new BadRequestException('Task is already completed');
      }

      // Update isCompleted -> true
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: { isCompleted: true },
      });

      return updatedTask;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to mark task as completed',
      );
    }
  }
}
