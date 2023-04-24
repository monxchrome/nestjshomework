import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PassportWrapperModule } from './auth/passport-wrapper.module';
import { CarsModule } from './cars/cars.module';
import { PrismaModule } from './core/orm/prisma.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    CarsModule,
    PrismaModule,
    AuthModule,
    PassportWrapperModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, PrismaModule],
})
export class AppModule {}
