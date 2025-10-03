import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
}
