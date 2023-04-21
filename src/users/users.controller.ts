import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { CarsService } from '../cars/cars.service';
import { CreateCarDto } from '../cars/dto/cars.dto';
import { DRYFileName, imageFileFilter } from '../core/file-upload/file-upload';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => CarsService))
    private readonly carService: CarsService,
  ) {}

  @Get()
  async getAll(@Req() req: any, @Res() res: any) {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.userService.getAll());
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: DRYFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createUser(
    @Req() req: any,
    @Res() res: any,
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }

    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @ApiParam({ name: 'userId', required: true })
  @Get('/:userId')
  async getById(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: number,
  ) {
    return res
      .status(HttpStatus.FOUND)
      .json(await this.userService.getById(userId));
  }

  @ApiParam({ name: 'userId', required: true })
  @Delete('/:userId')
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: number,
  ) {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.userService.deleteUser(userId));
  }

  @Patch('/:userId')
  async updateUser(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: number,
    @Body() body: CreateUserDto,
  ) {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.userService.updateUser(userId, body));
  }

  @Post('/cars/:userId')
  async addCar(
    @Req() req: any,
    @Res() res: any,
    @Param('userId') userId: number,
    @Body() body: CreateCarDto,
  ) {
    const user = await this.userService.getById(userId);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    return res
      .status(HttpStatus.OK)
      .json(await this.carService.createCar(body, userId));
  }
}
