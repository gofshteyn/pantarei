import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, ValidateIf } from "class-validator";

export default class UserResponse {

    @ApiProperty()
    @IsNumber()
    id: number;
  
    @ApiProperty()
    @IsString()
    email: string;
  
    @ApiProperty()
    @IsBoolean()
    emailVerified: boolean;
    
  }