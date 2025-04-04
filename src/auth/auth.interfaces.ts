export interface LoginResponse {
    accessToken: string;
}

export interface UserValidationResponse {
    id: number;
}

export interface JwtPayload {
    username: string;
    sub: number;
}

export interface JwtValidationResponse {
    userId: number;
    username: string;
}

export interface Request {
    user?: JwtPayload;
}