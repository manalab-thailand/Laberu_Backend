import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateManyImageDataDto } from './dto/create-many-image-data.dto';
import { ImageData } from './entities/image-data.schema';
import { ImageDataService } from './image-data.service';

@Controller('image-data')
export class ImageDataController {
  constructor(private readonly imageDataService: ImageDataService) {}

  @Post('create-many')
  async createManyImageData(
    payload: CreateManyImageDataDto,
  ): Promise<ImageData[]> {
    return await this.imageDataService.createManyImageData(payload);
  }
}
