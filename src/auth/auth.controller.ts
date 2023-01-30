import {Body, Controller, Post, UseInterceptors} from "@nestjs/common";
import {ServerResponseDto} from "../shared/dto/server-response.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {TransformResponseErrorsInterceptors} from "../interceptors/transform-response.interceptors";

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

    @Post('/change-password')
    public async changePassword(@Body() body: CreateUserDto): Promise<ServerResponseDto> {
        return {
            message: '',
            requestObject: {}
        }
    }

    @Post('/login')
    public async login(@Body() body: CreateUserDto): Promise<ServerResponseDto> {
        return {
            message: '',
            requestObject: {}
        }
    }
}
