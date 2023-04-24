import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as process from 'process';

import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, UsersService, BearerStrategy],
  exports: [AuthService],
})
export class AuthModule {}
