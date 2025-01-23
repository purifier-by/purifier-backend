import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class FindOneParams {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => String(value))
  slug: string;
}

export default FindOneParams;
