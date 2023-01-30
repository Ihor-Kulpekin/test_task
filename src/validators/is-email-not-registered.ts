import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

import {UserService} from "../user/user.service";
import {Inject, Injectable} from "@nestjs/common";

@ValidatorConstraint({async: true})
@Injectable()
export class IsEmailNotRegistered implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(email: string): Promise<boolean> {
        const user = await this.userService.getOne(email);

        return !user;
    }
}

export function EmailNotRegistered(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailNotRegistered,
            async: true
        });
    };
}
