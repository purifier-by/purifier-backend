import { IsString, IsNotEmpty } from 'class-validator';

class CategoryDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    image: string;
}

export default CategoryDto;