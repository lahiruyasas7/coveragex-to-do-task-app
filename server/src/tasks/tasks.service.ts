import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
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
}
