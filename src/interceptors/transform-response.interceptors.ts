import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {catchError, map, Observable, take, throwError} from "rxjs";
import {ServerResponseDto} from "../shared/dto/server-response.dto";
import {ExceptionResponseFilters} from "../exception-filters/exception-response.filters";

@Injectable()
export class TransformResponseErrorsInterceptors implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<ServerResponseDto>> {
        return next.handle().pipe(
            map((data) => ({
                message: 'success',
                requestObject: {
                    ...data
                }
            })),
            catchError((err) => throwError(() => new ExceptionResponseFilters(err.response)))
        );
    }
}
