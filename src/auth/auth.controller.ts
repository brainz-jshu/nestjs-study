import {
  Body,
  Controller,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MaxLengthPipe, MinLengthPipe } from './pipe/password.pipe';
import { BasicTokenGuard } from './guard/basic-token.guard';
import {
  AccessTokenGuard,
  RefreshTokenGuard,
} from './guard/bearer-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AccessTokenGuard)
  @Post('token/access')
  tokenAccess(@Headers('Authorization') authHeader: string) {
    const token = this.authService.extractTokenFromHeader(authHeader, true);
    const newToken = this.authService.rotateToken(token, false);
    return { accessToken: newToken };
  }

  @UseGuards(RefreshTokenGuard)
  @Post('token/refresh')
  tokenRefresh(@Headers('Authorization') authHeader: string) {
    const token = this.authService.extractTokenFromHeader(authHeader, true);
    const newToken = this.authService.rotateToken(token, true);
    return { refreshToken: newToken };
  }

  @UseGuards(BasicTokenGuard)
  @Post('login/email')
  async loginWithEmail(@Headers('Authorization') authHeader: string) {
    const token = this.authService.extractTokenFromHeader(authHeader, false);
    const credentials = this.authService.decodeBasicToken(token);
    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  async registerWithEmail(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password', new MaxLengthPipe(20), new MinLengthPipe(8))
    password: string,
  ) {
    return this.authService.registerWithEmail({ nickname, email, password });
  }
}
