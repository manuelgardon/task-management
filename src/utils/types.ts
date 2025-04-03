export interface IUser {
    id: number;
    username: string;
    password: string;
    tasks: ITask[];
}

export interface ITask {
    id: number;
    title: string;
    completed: boolean;
    user: IUser;
}

export interface ErrorResponse extends Partial<Error> {
    statusCode: number;
    message: string;
}
