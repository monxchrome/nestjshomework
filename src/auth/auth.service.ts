import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async compareHash(bodyPassword: string, hash: string) {
    return bcrypt.compare(bodyPassword, hash);
  }

  async signIn(userId: string) {
    return this.jwtService.sign({ id: userId });
  }
}
