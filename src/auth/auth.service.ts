import { UserService } from './../user/user.service';
import { AdminService } from './../admin/admin.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string, validateAdmin: boolean) {
    let user;

    if (validateAdmin) {
      user = (await this.adminService.findUserByEmail(email))[0];
    } else {
      user = (await this.userService.findUserByEmail(email))[0];
    }

    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
