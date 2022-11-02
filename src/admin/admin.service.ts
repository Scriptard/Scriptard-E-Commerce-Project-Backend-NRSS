import { loginUserDto } from './dto/login-user.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const isEmailAlreadyTaken =
      (await this.findUserByEmail(createAdminDto.email)).length === 1
        ? true
        : false;
    if (isEmailAlreadyTaken) {
      return new ConflictException('Email is already taken');
    }

    createAdminDto.password = await bcrypt.hash(
      createAdminDto.password,
      parseInt(process.env.PASSWORD_SALT),
    );
    const newAdmin = this.adminRepository.create(createAdminDto);
    await this.adminRepository.save(newAdmin);
    return { message: 'Admin Sucessfully Created' };
  }

  async findUserByEmail(email: string) {
    return await this.adminRepository.find({
      where: {
        email: email,
      },
    });
  }
}
