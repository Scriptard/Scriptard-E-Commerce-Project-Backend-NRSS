import { jwtConstants } from './../auth/constant';
import { JwtmoduleService } from './../jwtmodule/jwtmodule.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Request,
  UseGuards,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { successMessage } from 'src/response-output/successMessage';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { loginUserDto } from './dto/login-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtmoduleService: JwtmoduleService,
  ) {}

  @ApiCreatedResponse({
    description: 'Gets A Response of User is Created',
    type: successMessage,
  })
  @ApiConflictResponse({
    type: HttpException,
    description: "Get's a http exception of conflicting email",
  })
  @Post('signup')
  async create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginUserDto: loginUserDto, @Request() req) {
    return this.jwtmoduleService.login(req.user, true);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('testroute')
  testGet(@Request() req) {
    return req.user;
  }
}
