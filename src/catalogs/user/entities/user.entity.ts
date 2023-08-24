import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
    
    @Column
    email: string;

    @Column
    emailVerified: boolean;

    @Column
    imageURL: string;

    @Column
    passwordHash: string;

    @Column
    localizationId: string;

    @Column
    deleted: boolean;
}
