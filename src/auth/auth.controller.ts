import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './auth.interfaces';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { username: string, password: string }): Promise<LoginResponse> {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        else return this.authService.login(user);
    } 
}
