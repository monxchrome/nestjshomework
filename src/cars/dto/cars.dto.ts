import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ required: true, example: 'Supra' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ required: true, example: '1997' })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  image: string;

  @IsString()
  type: string;

  @IsString()
  logo: string;

  @ApiProperty({ required: true, example: 'true' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
