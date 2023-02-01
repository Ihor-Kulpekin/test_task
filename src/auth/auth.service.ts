import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {LoginUserDto} from "../user/dto/login-user-dto";
import {IUser} from "../user/interfaces/user.interface";
import {UserNotExistedExceptionFilters} from "../exception-filters/user-not-existed-exception.filters";
import {PasswordIsNotCorrectFilters} from "../exception-filters/password-is-not-correct.filters";

const saltOrRounds = 10;

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {
    }

    public async register(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.create(createUserDto)
    }

    public async login(loginUserDto: LoginUserDto): Promise<IUser> {
        const user = await this.userService.getOne(loginUserDto.email);

        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

        if (!isMatch) {
            throw new PasswordIsNotCorrectFilters('Password not match')
        }

        return user;
    }

    public async changePassword(ChangePasswordDto: ChangePasswordDto): Promise<string> {
        return 'login'
    }
}
