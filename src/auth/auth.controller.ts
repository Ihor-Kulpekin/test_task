import {Body, Controller, Post, Session, UseInterceptors, Request} from "@nestjs/common";
import { FastifyRequest } from 'fastify';

import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {TransformResponseErrorsInterceptors} from "../interceptors/transform-response.interceptors";
import {LoginUserDto} from "../user/dto/login-user-dto";
import {Session as FastifySession, SessionData} from "@fastify/secure-session";


@Controller('/auth')
@UseInterceptors(TransformResponseErrorsInterceptors)
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('/register')
    public async register(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
        return this.authService.register(createUserDto)
    }

    @Post('/login')
    public async login(@Request() request: FastifyRequest, @Session() session: FastifySession, @Body() loginUserDto: LoginUserDto): Promise<SessionData> {
        const user = await this.authService.login(loginUserDto);

        session.set('data', user);

        request.session.authenticated = true;
        console.log('request.session', request.session);

        return session.data();
    }
}
