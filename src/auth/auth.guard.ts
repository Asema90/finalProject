import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const authorizationHeader: string = request.headers.authorization;

      if (!authorizationHeader)
        throw new UnauthorizedException('Missing authorization header');

      const [scheme, token] = authorizationHeader.split(' ');

      if (scheme !== 'Bearer' || !token)
        throw new UnauthorizedException('Invalid authorization header');

      const secret = this.configService.get<string>('JWT_TOKEN');
      const user = await this.jwtService.verify(token, { secret });
      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
