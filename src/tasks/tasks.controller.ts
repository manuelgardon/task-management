import { Body, Controller, ForbiddenException, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { Request } from 'src/auth/auth.interfaces';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAll(@Req() request: Request): Promise<Task[]> {
        const user = request.user;
        if (!user) throw new ForbiddenException('User not found');
        return this.tasksService.findAllByUser(user.sub);
    }

    @Post()
    create(@Body() task: Partial<Task>, @Req() request: Request): Promise<Task> {
        const user = request.user;
        if (!user) throw new ForbiddenException('User not found');
        return this.tasksService.create(task, user.sub);
    }
    
    @Get(':id')
    async findOneById(@Param('id') id: string, @Req() request: Request): Promise<Task> {
        const user = request.user;
        if (!user) throw new ForbiddenException('User not found');
        const task = await this.tasksService.findOneById(Number(id), user.sub);
        if (!task) throw new ForbiddenException('Task not found');
        return task;
    }

    @Get('populate')
    async populateTasks(): Promise<void> {
        const populateTasks = await this.tasksService.populateTasks();
        if (!populateTasks) throw new ForbiddenException('Error populating tasks. User not found');
    }
}
