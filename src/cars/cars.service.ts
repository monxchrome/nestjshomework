import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Car } from '@prisma/client';

import { PrismaService } from '../core/orm/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateCarDto } from './dto/cars.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async getAll() {
    return this.prismaService.car.findMany();
  }

  async getById(carId: number) {
    return this.prismaService.car.findUnique({
      where: {
        id: Number(carId),
      },
    });
  }

  async createCar(data: CreateCarDto, userId: number): Promise<Car> {
    const user = await this.userService.getById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prismaService.car.create({
      data: {
        brand: data.brand,
        model: data.model,
        year: data.year,
        image: data.image,
        type: data.type,
        logo: data.logo,
        status: data.status,
      },
    });
  }

  async deleteCar(carId: number) {
    return this.prismaService.car.delete({
      where: {
        id: Number(carId),
      },
    });
  }

  async updateCar(carId: number, updateData) {
    return this.prismaService.car.update({
      where: {
        id: Number(carId),
      },
      data: updateData,
    });
  }
}
