import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const session = request.session;

        return !(session && !session.user);
    }
}
