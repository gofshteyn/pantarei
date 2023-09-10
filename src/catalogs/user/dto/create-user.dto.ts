import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'ivan@ivanov.com', description: 'Адрес электронной почты'})
    @IsString()
    readonly email: string;

    @ApiProperty({example: 'password', description: 'Пароль. Пароль хранится в базе данных в зашифрованном виде.'})
    @IsString()
    password: string;
}
