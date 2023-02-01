import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

import {UserService} from "../user/user.service";
import {Inject, Injectable} from "@nestjs/common";
import {TARGET_NAME} from "../shared/constants";

@ValidatorConstraint({async: true})
@Injectable()
export class IsEmailNotRegistered implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}

    async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this.userService.getOne(email);

        return validationArguments && [TARGET_NAME.LOGIN_USER, TARGET_NAME.CHANGE_PASSWORD].includes(validationArguments.targetName) ? !!user : !user;
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
