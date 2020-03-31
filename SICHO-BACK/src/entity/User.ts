import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Subject } from "./Subject";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    honorific: string;

    @Column()
    department: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    extension: string;

    @Column()
    schedule: Subject[];
}
