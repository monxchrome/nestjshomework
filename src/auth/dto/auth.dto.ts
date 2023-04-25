import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ required: true, example: 'stefan@mail.net' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, example: '@ASdQwE556!szxc@fkd#' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto {
  @ApiProperty({ required: false, example: 'Stefan' })
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  age: number;

  @ApiProperty({ required: true, example: 'stefan@mail.net' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsOptional()
  avatar: string;
}
