import {IsNotEmpty, IsEmail, IsString, Length} from "class-validator";
import {EmailNotRegistered} from "../../validators/is-email-not-registered";

export class CreateUserDto {
    @EmailNotRegistered({ message: 'email already registered' })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    password: string
}
