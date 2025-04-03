export interface User {
    id: number;
    username: string;
    password: string;
    tasks: Task[];
}

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    user: User;
}

export interface ErrorResponse extends Partial<Error> {
    statusCode: number;
    message: string;
}