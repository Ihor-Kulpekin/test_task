import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';

import {User} from "./user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./interfaces/user.interface";
import {ChangePasswordDto} from "./dto/change-password.dto";

const saltOrRounds = 10;

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    public async getOne(email: string): Promise<IUser | null> {
        return this.userModel.findOne({email:{$regex: email, $options: 'i'}}).exec();
    }

    public async create(
        createUserDto: CreateUserDto,
    ): Promise<IUser> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);

        return this.userModel.create(createUserDto);
    }

    public async updatePassword(
        user: IUser,
        changePassword: ChangePasswordDto
    ): Promise<any> {
        changePassword.password = await bcrypt.hash(changePassword.password, saltOrRounds);
        return this.userModel.updateOne({email: user.email},
            {$set: {...changePassword}})
    }

    public async changePassword(email: string, password: string): Promise<any> {
        return this.userModel.updateOne({email}, {$set: {password}})
    }
}
