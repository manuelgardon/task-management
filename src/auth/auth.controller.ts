import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorResponse, User } from 'src/utils/types';
import { LoginResponse } from './auth.interfaces';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() credentials: Partial<User>): Promise<ErrorResponse | LoginResponse> {
        const user = await this.authService.validateUser(credentials);
        if (!user) return { statusCode: 403, message: 'Invalid credentials' };
        else return this.authService.login(user);
    } 
}
