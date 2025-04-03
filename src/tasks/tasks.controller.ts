import { Body, Controller, ForbiddenException, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAll(@Request() request): Promise<Task[]> {
        return this.tasksService.findAllByUser(request.user);
    }

    @Post()
    create(@Body() task: Partial<Task>, @Request() request): Promise<Task> {
        return this.tasksService.create(task, request.user);
    }
    
    @Get(':id')
    async findOneById(@Param('id') id: string, @Request() request): Promise<Task> {
        const task = await this.tasksService.findOneById(Number(id), request.user);
        if (!task) throw new ForbiddenException('Task not found or access denied');
        return task;
    }

    @Get('populate')
    async populateTasks(): Promise<void> {
        await this.tasksService.populateTasks();
    }
}
