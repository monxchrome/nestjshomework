import { Module } from '@nestjs/common';

import { PrismaService } from '../core/orm/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class UsersModule {}
