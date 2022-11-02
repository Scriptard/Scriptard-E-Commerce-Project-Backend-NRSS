import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userOutputFromDb = await this.findUserByEmail(createUserDto.email);
    if (userOutputFromDb.length === 1) {
      return new ConflictException('Email is already taken');
    }

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      parseInt(this.configService.get('PASSWORD_SALT')),
    );

    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return { message: 'User Sucessfully Created' };
  }

  findUserByEmail(email: string) {
    return this.userRepository.find({
      where: {
        email: email,
      },
    });
  }
}
