import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const rawToken = req.headers['authorization'];
    if (!rawToken) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const credentials = this.authService.decodeBasicToken(token);
    const user =
      await this.authService.authenticateWithEmailAndPassword(credentials);
    req.user = user;
    return true;
  }
}
