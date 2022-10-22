import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { successMessage } from 'src/response-output/successMessage';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { loginUserDto } from './dto/login-user.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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

  @Post('login')
  async login(@Body() loginUserDto: loginUserDto) {
    return this.adminService.login(loginUserDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
