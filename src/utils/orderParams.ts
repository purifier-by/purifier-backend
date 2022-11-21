import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum ORDER {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class OrderParams {

    @IsString()
    @ApiProperty({ required: true, name: 'orderBy' })
    orderBy?: string;

    @IsEnum(ORDER, { each: true })
    @ApiProperty({ required: true, name: 'sort', enum: ORDER, })
    sort?: ORDER;
}
