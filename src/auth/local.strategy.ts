import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    console.log('local strategy validate working');
    const isAdminRoute = req.url === '/admin/login';
    console.log('is admin route: ', isAdminRoute);
    const user = await this.authService.validateUser(
      email,
      password,
      isAdminRoute,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
