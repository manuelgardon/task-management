import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('register')
    async register(@Body() body: { username: string, password: string }): Promise<User> {
        const user = await this.userService.create(body.username, body.password);
        if (!user) throw new Error('User already exists');
        else return user;
    } 
}