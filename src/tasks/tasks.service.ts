import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,
    ) {}

    findAllByUser(user: User): Promise<Task[]> {
        return this.tasksRepository.find({ where: { user } });
    }
    
    create(task: Partial<Task>, user: User): Promise<Task> {
        const newTask = this.tasksRepository.create({ ...task, user });
        return this.tasksRepository.save(newTask);
    }

    findOneById(id: number, user: User): Promise<Task | null> {
        const task = this.tasksRepository.findOne({ where: { id, user } });
        if (!task) throw new Error('Access denied');
        else return task;
    }

    async populateTasks(): Promise<void> {
        const response = await fetch(POPULATE_URL);
        const tasks = await response.json(); // agregar tipado de tasks
        const tasksToSave = tasks.map((task: any) => ({
          title: task.title,
          completed: task.completed,
          user: { id: 1 }, // corregir
        }));
        await this.tasksRepository.save(tasksToSave);
    }
}
