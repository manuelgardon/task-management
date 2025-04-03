import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorResponse } from 'src/utils/types';
import { LoginResponse } from './auth.interfaces';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { username: string, password: string }): Promise<ErrorResponse | LoginResponse> {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) return { statusCode: 403, message: 'Invalid credentials' };
        else return this.authService.login(user);
    } 
}
