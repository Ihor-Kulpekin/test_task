import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import {IsEmailNotRegistered} from "../validators/is-email-not-registered";

@Module({
    imports: [
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    providers: [IsEmailNotRegistered, UserService],
    exports: [UserService]
})
export class UserModule {}
