import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';

import {User} from "./user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./interfaces/user.interface";

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

    public async changePassword(email: string, password: string): Promise<any> {
        return this.userModel.updateOne({email}, {$set: {password}})
    }
}
