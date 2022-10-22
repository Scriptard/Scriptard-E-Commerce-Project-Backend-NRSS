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
      parseInt(process.env.salt),
    );
    const newAdmin = this.adminRepository.create(createAdminDto);
    await this.adminRepository.save(newAdmin);
    return { message: 'Admin Sucessfully Created' };
  }

  async login(loginUserDto: loginUserDto) {
    const userArray = await this.findUserByEmail(loginUserDto.email);
    if (userArray.length === 0) {
      return new UnauthorizedException('Admin With Email Not Found');
    }
    const isPasswordCorrect = await bcrypt.compare(
      loginUserDto.password,
      userArray[0].password,
    );

    if (!isPasswordCorrect) {
      return new UnauthorizedException('Wrong Password For Admin');
    } else {
      return { message: 'User Successfully Logged In' };
    }
  }

  findAll() {
    return `This action returns all admin`;
  }

  async findUserByEmail(email: string) {
    return await this.adminRepository.find({
      where: {
        email: email,
      },
    });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
