import {EmailNotRegistered} from "../../validators/is-email-not-registered";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class LoginUserDto {
    @EmailNotRegistered({ message: 'User is not existed' })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    password: string
}
