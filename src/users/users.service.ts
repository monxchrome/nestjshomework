import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: any = [];

  async getAll() {
    return this.users;
  }

  async getById(userId: string) {
    return this.users.find((item) => item.id === userId);
  }

  async createUser(userData: CreateUserDto) {
    const id: string = uuid();
    const newObj = {
      id: id,
      ...userData,
    };

    return this.users.push(newObj);
  }

  async deleteUser(userId: string) {
    const user = this.users.find((item) => item.id === userId);

    if (user !== -1) {
      this.users.splice(user, 1);
    }
    return this.users;
  }

  async updateUser(userId: string, updateData) {
    const id: string = uuid();
    const indexArr = this.users.findIndex((item) => item.id === userId);

    if (indexArr !== -1) {
      this.users[indexArr] = { id: id, ...updateData };
    }
    return this.users;
  }
}
