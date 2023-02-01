import {IsNotEmpty, IsString, Length} from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    password: string
}
