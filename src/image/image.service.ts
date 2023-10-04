import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImageDto } from './dto/image.dto/image.dto';

@Injectable()
export class ImageService {
    constructor (
        @InjectRepository(Image)
        private readonly ImageRepository: Repository<Image>
    ) {}

    async create(createImageDto: ImageDto): Promise<Image> {
        const image = this.ImageRepository.create(createImageDto);
        return await this.ImageRepository.save(image);
    }

    async findAll(): Promise<Image[]> {
        return await this.ImageRepository.find();
    }

    async findById(id: number): Promise<Image> {
        const image = await this.ImageRepository.findOne({where: {id}} );
        if(!image) {
            throw new NotFoundException('Image not found');
        }
        return image;
    }

    async update(id: number, updateImageDto: ImageDto): Promise<Image> {
        const image = await this.findById(id);
        this.ImageRepository.merge(image, updateImageDto);
        return await this.ImageRepository.save(image);
    }

    async remove(id: number): Promise<void> {
        const image = await this.findById(id);
        await this.ImageRepository.remove(image);
    }

}
