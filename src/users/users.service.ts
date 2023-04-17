import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../core/orm/prisma.service';
import { User } from '@prisma/client';

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

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        username: userData.username,
        password: userData.password,
        age: userData.age,
        email: userData.email,
        status: userData.status,
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
