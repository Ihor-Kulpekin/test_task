import {Body, Controller, Post, Request, Session, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../auth/auth.guard";
import {FastifyRequest} from "fastify";
import {Session as FastifySession} from "@fastify/secure-session";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {ServerResponseDto} from "../shared/dto/server-response.dto";
import {UserService} from "./user.service";

@Controller('/user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('/change-password')
    @UseGuards(AuthGuard)
    public async changePassword(@Request() request: FastifyRequest, @Session() session: FastifySession, @Body() changePasswordDto: ChangePasswordDto): Promise<ServerResponseDto> {
        console.log('session-changePassword',request.session);
        console.log('body', changePasswordDto);

        return {
            message: '',
            requestObject: {}
        }
    }
}
