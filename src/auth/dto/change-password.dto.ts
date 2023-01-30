import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class ChangePasswordDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    password: string
}
