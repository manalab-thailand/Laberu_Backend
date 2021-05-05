import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ImageDataService } from './image-data.service';
import { CreateImageDatumDto } from './dto/create-image-datum.dto';
import { UpdateImageDatumDto } from './dto/update-image-datum.dto';

@Controller('image-data')
export class ImageDataController {
  constructor(private readonly imageDataService: ImageDataService) { }

  @Post('create')
  async create(@Body() createImageDatumDto: CreateImageDatumDto) {
    return await this.imageDataService.create(createImageDatumDto);
  }

  @Get()
  async findAll() {
    return await this.imageDataService.findAll();
  }

  @Get('getCountImage')
  async getCountImageData() {
    return await this.imageDataService.getCountImageData();
  }

  @Get('/shortcode=:shortcode')
  async findByShortcode(@Param('shortcode') shortcode: String) {
    return await this.imageDataService.findByShortcode(shortcode);
  }

  @Delete('deleteAll')
  async removeAll() {
    return await this.imageDataService.removeAll();
  }
}
