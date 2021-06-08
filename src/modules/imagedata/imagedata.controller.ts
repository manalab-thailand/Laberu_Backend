import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { createImageData } from './dto/create.dto';
import { FindCountByProjectId } from './dto/find-count-by-project-id.dto';
import { FindOneByShortcode } from './dto/find-one-by-shortcode.dto';
import { IImagedataController } from './imagedata-inferface.controller';
import { ImagedataService } from './imagedata.service';

@Controller('imagedata')
export class ImagedataController implements IImagedataController {

  constructor(private readonly imageDataService: ImagedataService) { }

  @Post('create')
  async create(@Body() payload: createImageData): Promise<any> {
    return await this.imageDataService.createImageData(payload);
  }

  @Get('findOneByShortcode')
  async findOneByShortcode(@Body() payload: FindOneByShortcode): Promise<any> {
    return await this.imageDataService.findOneByShortcode(payload);
  }

  @Get('findCountByProjectId')
  async findCountByProjectId(@Body() payload: FindCountByProjectId): Promise<any> {
    return await this.imageDataService.findCountByProjectId(payload);
  }

}
