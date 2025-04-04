import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('register')
    async register(@Body() body: { username: string, password: string }): Promise<any> {
        const user = await this.userService.create(body.username, body.password);
        if (!user) throw new UnauthorizedException('User already exists');
        else return user;
    } 
}