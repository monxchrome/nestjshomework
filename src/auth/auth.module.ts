import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as process from 'process';

import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';
import { CoreModule } from "../core/core.module";
import { MailService } from "../core/mail/mail.service";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    CoreModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, UsersService, BearerStrategy, MailService],
  exports: [AuthService],
})
export class AuthModule {}
