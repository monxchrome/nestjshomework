import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/cars.controller';
import { CarsModule } from './cars/cars.module';
import { PrismaService } from './core/orm/prisma.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, CarsModule],
  controllers: [AppController, UsersController, CarsController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}
