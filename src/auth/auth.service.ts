import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ChangePasswordDto} from "./dto/change-password.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {
    }

    public async register(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.create(createUserDto)
    }

    public async login(createUserDto: CreateUserDto): Promise<string> {
        return 'login'
    }

    public async changePassword(changePasswordDto: ChangePasswordDto): Promise<string> {
        return 'login'
    }
}
