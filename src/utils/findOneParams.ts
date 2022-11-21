import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class FindOneParams {

    @ApiProperty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    id: number;
}

export default FindOneParams;