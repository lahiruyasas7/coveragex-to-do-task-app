import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/configs/database-config/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
