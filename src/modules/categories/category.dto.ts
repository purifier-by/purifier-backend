import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { substringDomain } from 'src/utils/substringDomain';

class CategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @Transform(({ value }) => substringDomain(value))
    image: string;
}

export default CategoryDto;