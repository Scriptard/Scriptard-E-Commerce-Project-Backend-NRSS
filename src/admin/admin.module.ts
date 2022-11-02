import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { JwtmoduleModule } from 'src/jwtmodule/jwtmodule.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [TypeOrmModule.forFeature([Admin]), JwtmoduleModule],
  exports: [AdminService],
})
export class AdminModule {}
