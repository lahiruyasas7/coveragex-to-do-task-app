import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  // GET most recent 5 tasks. If limit query param is provided, return that many tasks.
  @Get()
  findRecent(@Query('limit') limit?: string) {
    const l = limit ? parseInt(limit, 10) : 5;
    return this.tasksService.findRecentTasks(l);
  }

  /**
   * PATCH /tasks/:id/complete
   * Marks a task as completed (isCompleted = true)
   */
  @Patch(':id/complete')
  async markAsCompleted(@Param('id') id: string) {
    const updatedTask = await this.tasksService.markTaskAsCompleted(id);
    return {
      success: true,
      message: 'Task marked as completed',
      data: updatedTask,
    };
  }
}
