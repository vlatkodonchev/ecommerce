import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './image.entity';
import { ImageDto } from './dto/image.dto/image.dto';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('create')
    async createImage(@Body() createImageDto: ImageDto): Promise<Image> {
        return this.imageService.create(createImageDto);
    }

    @Get('all')
    async findAllImages(): Promise<Image[]> {
        return this.imageService.findAll();
    }

    @Get(':id')
    async findImageById(@Param('id') id: number): Promise<Image> {
        return this.imageService.findById(id);
    }

    @Put(':id')
    async updateImage(@Param('id') id: number, @Body() CreateImageDto: ImageDto) {
        return this.imageService.update(id, CreateImageDto);
    }

    @Delete(':id')
    async deleteImageById(@Param('id') id: number): Promise<void> {
        return this.imageService.remove(id);
    }
}
