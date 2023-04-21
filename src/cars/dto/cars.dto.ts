import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
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

  image: string;

  type: string;

  logo: string;

  @ApiProperty({ required: true, example: 'true' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
