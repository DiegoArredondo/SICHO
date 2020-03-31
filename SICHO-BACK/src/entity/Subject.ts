import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    SubjectId: number;

    @Column()
    SubjectName: string;

    @Column()
    start: string;

    @Column()
    durationMinutes: number;

    @Column()
    days: number[];

}