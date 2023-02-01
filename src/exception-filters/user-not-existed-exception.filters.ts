import {NotFoundException} from "@nestjs/common";

export class UserNotExistedExceptionFilters extends NotFoundException{
    constructor(message: string) {
        super({
            messageResponse: message
        });
    }
}
