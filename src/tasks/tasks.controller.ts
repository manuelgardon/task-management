import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { Request } from 'src/auth/auth.interfaces';
import { TaskDto } from './types';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAll(
        @Req() request: Request,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ): Promise<{ tasks: Task[]; total: number }> {
        const user = request?.user;
        if (!user || !user.userId) throw new ForbiddenException('User not found');
        if (!Number(page) || !Number(limit)) throw new ForbiddenException('Page and limit must be numbers'); 
        if (Number(page) < 1 || Number(limit) < 1) throw new ForbiddenException('Page and limit must be greater than 0');
        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10;
        return this.tasksService.findAllByUser(user.userId, pageNum, limitNum);
    }

    @Post()
    create(@Body() task: TaskDto, @Req() request: Request): Promise<Task> {
        const user = request?.user;
        if (!user || !user.userId) throw new ForbiddenException('User not found');
        return this.tasksService.create(task, user.userId);
    }
    
    @Get(':id')
    async findOneById(@Param('id') id: string, @Req() request: Request): Promise<Task> {
        const user = request?.user;
        if (!user || !user.userId) throw new ForbiddenException('User not found');
        const task = await this.tasksService.findOneById(Number(id), user.userId);
        if (!task) throw new ForbiddenException('Task not found');
        return task;
    }

    @Get('populate')
    async populateTasks(): Promise<void> {
        const populateTasks = await this.tasksService.populateTasks();
        if (!populateTasks) throw new ForbiddenException('Error populating tasks. User not found');
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() request: Request): Promise<void> {
        const user = request?.user;
        if (!user || !user.userId) throw new ForbiddenException('User not found');
        const task = await this.tasksService.findOneById(Number(id), user.userId);
        if (!task) throw new ForbiddenException('Task not found');
        this.tasksService.remove(Number(id), user.userId);
    }
}
