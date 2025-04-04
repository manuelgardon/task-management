import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    completed: boolean;

    @Column()
    userId: number;
}
