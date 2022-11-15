import { IsString, IsNotEmpty } from 'class-validator';

class BrandDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}

export default BrandDto;