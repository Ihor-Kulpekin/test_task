import {BadRequestException} from "@nestjs/common";

export class PasswordIsNotCorrectFilters extends BadRequestException {
    constructor(message: string) {
        super({
            messageResponse: message,
        });
    }
}
