import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'users'})
export class User extends Model {
    
    @Column
    email: string;

    @Column({defaultValue: false})
    emailVerified: boolean;

    @Column
    passwordHash: string;

    @Column({defaultValue: false})
    deleted: boolean;
}
