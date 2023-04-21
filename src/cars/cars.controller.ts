import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { DRYFileName, imageFileFilter } from '../core/file-upload/file-upload';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/cars.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  async getAll(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.ACCEPTED).json(await this.carService.getAll());
  }

  @ApiParam({ name: 'carId', required: true })
  @Get('/:carId')
  async getById(
    @Req() req: any,
    @Res() res: any,
    @Param('carId') carId: number,
  ) {
    return res
      .status(HttpStatus.FOUND)
      .json(await this.carService.getById(carId));
  }

  @ApiParam({ name: 'carId', required: true })
  @Delete('/:carId')
  async deleteCar(
    @Req() req: any,
    @Res() res: any,
    @Param('carId') carId: number,
  ) {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.carService.deleteCar(carId));
  }

  @Patch('/:carId')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './public/cars',
          filename: DRYFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  async updateCar(
    @Req() req: any,
    @Res() res: any,
    @Param('carId') carId: number,
    @Body() body: CreateCarDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      logo: Express.Multer.File[];
    },
  ) {
    if (files?.image) {
      body.image = `/public/animals/${files[0].filename}`;
    }

    if (files?.logo) {
      body.logo = `/public/animals/${files[0].filename}`;
    }

    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.carService.updateCar(carId, body));
  }
}
