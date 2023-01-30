import {HttpException} from "@nestjs/common";

export class ExceptionResponseFilters extends HttpException {
    constructor(err: any) {
        super({
            message: 'error',
            requestObject: {
                ...err
            }
        }, 400);
    }
}
