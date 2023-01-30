import {IsObject, IsString} from "class-validator";

export class ServerResponseDto {
    @IsObject()
    requestObject: any;

    @IsString()
    message: string;
}
