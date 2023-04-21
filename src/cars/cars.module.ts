import { forwardRef, Module } from '@nestjs/common';

import { PrismaService } from '../core/orm/prisma.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [CarsService, UsersService, PrismaService],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
