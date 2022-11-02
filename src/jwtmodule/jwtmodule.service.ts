import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtmoduleService {
  constructor(private jwtService: JwtService) {}

  async login(user: any, isAdmin: boolean) {
    const payLoadEmailProperty = isAdmin ? 'adminEmail' : 'email';
    const payload = { [payLoadEmailProperty]: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
