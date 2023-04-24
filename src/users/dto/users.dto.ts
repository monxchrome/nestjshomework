import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { IsValidDays } from '../decorators/check.days.decorator';

export class CreateUserDto {
  @ApiProperty({ required: false, example: 'Stefan' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: true, example: 'ssstefan_123' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true, example: '@ASdQwE556!szxc@fkd#' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false, example: 20 })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({ required: true, example: 'stefan@mail.net' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: 'true' })
  @IsBoolean()
  @IsOptional()
  status: boolean;

  @ApiProperty()
  avatar: string;

  // table for personal

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @IsValidDays()
  dayOff: string;
}
