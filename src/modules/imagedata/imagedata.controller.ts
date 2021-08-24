import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { createImageData } from './dto/create.dto';
import { FindCountByProjectId } from './dto/find-count-by-project-id.dto';
import { FindOneByShortcode } from './dto/find-one-by-shortcode.dto';
import { IImagedataController } from './interface/imagedata-inferface.controller';
import { ImagedataService } from './imagedata.service';
import { CraeteImageDataMany } from './dto/insertmany';

@Controller('imagedata')
export class ImagedataController implements IImagedataController {

  constructor(private readonly imageDataService: ImagedataService) { }

  @Post('create')
  async create(@Body() payload: createImageData): Promise<any> {
    return await this.imageDataService.createImageData(payload);
  }

  @Get('findALl')
  async findAll(): Promise<any> {
    return await this.imageDataService.findAll();
  }

  @Get('findOneByShortcode')
  async findOneByShortcode(@Query() payload: FindOneByShortcode): Promise<any> {
    return await this.imageDataService.findOneByShortcode(payload);
  }

  @Get('findAllByProjectId')
  async findAllByProjectId(@Query() payload: FindCountByProjectId): Promise<any> {
    return await this.imageDataService.findAllByProjectId(payload);
  }

  @Get('findCountByProjectId')
  async findCountByProjectId(@Query() payload: FindCountByProjectId): Promise<any> {
    return await this.imageDataService.findCountByProjectId(payload);
  }

  @Post('insertMany')
  async interMany(@Body() payload: CraeteImageDataMany): Promise<any> {
    return await this.imageDataService.insertMany(payload);
  }

}
