import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as process from 'process';

import { RegisterDto } from '../auth/dto/auth.dto';
import { PrismaService } from '../core/orm/prisma.service';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.user.findMany();
  }

  async getById(userId: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
  }

  async getByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        password: userData.password,
        age: userData.age,
        email: userData.email,
        status: userData.status,
        avatar: userData.avatar,
      },
    });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, +process.env.PASSWORD_SALT);
  }

  async registerUser(userData: RegisterDto): Promise<User> {
    const passwordHash = await this.hashPassword(userData.password);
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        password: passwordHash,
        age: userData.age,
        email: userData.email,
        avatar: userData.avatar,
      },
    });
  }

  async deleteUser(userId: number) {
    return this.prismaService.user.delete({
      where: {
        id: Number(userId),
      },
    });
  }

  async updateUser(userId: number, updateData) {
    return this.prismaService.user.update({
      where: {
        id: Number(userId),
      },
      data: updateData,
    });
  }
}
