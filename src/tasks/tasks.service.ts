import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { POPULATE_URL } from 'src/utils/constants';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAllByUser(userId: number): Promise<Task[]> {
        return this.tasksRepository.find({ where: { userId } });
    }
    
    async create(task: Partial<Task>, userId: number): Promise<Task> {
        const newTask = this.tasksRepository.create({ ...task, userId });
        return this.tasksRepository.save(newTask);
    }

    async findOneById(id: number, userId: number): Promise<Task | null> {
        const task = this.tasksRepository.findOne({ where: { id, userId } });
        return task;
    }
    
    async remove(id: number, userId: number): Promise<void> {
        await this.tasksRepository.delete({ id, userId });
    }

    async populateTasks(): Promise<Task[] | null> {
        const response = await fetch(POPULATE_URL);
        const tasks: Task[] = await response.json();
        
        const existingUserIds = (await this.usersRepository.find()).map(user => Number(user.id));
        
        const tasksToSave = tasks
          .filter((task) => existingUserIds.includes(task.userId))
          .map((task) => ({
            title: task.title,
            completed: task.completed,
            userId: task.userId,
          }));

        if (!tasksToSave) return null;
        return await this.tasksRepository.save(tasksToSave);
    }
}
