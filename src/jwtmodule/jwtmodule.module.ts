import { Module } from '@nestjs/common';
import { JwtmoduleService } from './jwtmodule.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [JwtmoduleService],
  exports: [JwtmoduleService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: '86400s' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class JwtmoduleModule {}
