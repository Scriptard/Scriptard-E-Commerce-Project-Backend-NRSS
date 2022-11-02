import { loginUserDto } from './../admin/dto/login-user.dto';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtmoduleService } from 'src/jwtmodule/jwtmodule.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtmoduleService: JwtmoduleService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginUserDto: loginUserDto, @Request() req) {
    return this.jwtmoduleService.login(req.user, false);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('testjwt')
  testJwt(@Request() req) {
    return req.user;
  }
}
