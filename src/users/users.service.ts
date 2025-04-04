import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findOne(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }

    async create(username: string, password: string): Promise<User | null> {
        const user = this.userRepository.create({ username, password });
        return this.userRepository.save(user);
      }
}
