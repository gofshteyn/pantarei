import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import UserResponse from "src/catalogs/user/entities/user-response.entity";

export default class AuthUserResponse extends UserResponse {

    @ApiProperty()
    @IsString()
    token: string;

}