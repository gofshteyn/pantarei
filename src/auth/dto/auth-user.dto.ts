import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthUserDto {

    @ApiProperty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsString()
    password: string;
}