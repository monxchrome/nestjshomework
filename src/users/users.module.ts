import { forwardRef, Module } from '@nestjs/common';

import { CarsModule } from '../cars/cars.module';
import { CarsService } from '../cars/cars.service';
import { PrismaModule } from '../core/orm/prisma.module';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, forwardRef(() => CarsModule)],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, CarsService],
})
export class UsersModule {}
