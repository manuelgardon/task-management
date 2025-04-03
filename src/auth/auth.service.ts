import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './auth.interfaces';
import { User } from 'src/utils/types';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser({ username, password }: Partial<User>): Promise<Partial<User> | null> {
        if (!username || !password) return null;
        const user = await this.usersService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        } else return null;
    }

    async login(user: Partial<User>): Promise<LoginResponse> {
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
