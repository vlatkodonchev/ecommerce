import { IsString, IsNotEmpty, IsNumber, Matches } from 'class-validator';

const imageUrl = /^(https?):\/\/images\.unsplash\.com\/photo-\d+\-[a-zA-Z0-9]+(\?[\w\W]*)?$/i;

export class ImageDto {

    @IsString()
    @IsNotEmpty()
    @Matches(imageUrl, {message: 'Invalid image format'})
    url: string;

    @IsNumber()
    priority: number
}
