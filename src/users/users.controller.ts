import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(@Req() req: any, @Res() res: any) {
    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.userService.getAll());
  }

  @Post()
  async createUser(
    @Req() req: any,
    @Res() res: any,
    @Body() body: CreateUserDto,
  ) {
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
}
