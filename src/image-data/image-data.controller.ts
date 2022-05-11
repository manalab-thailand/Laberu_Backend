import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateManyImageDataDto } from './dto/create-many-image-data.dto';
import { ImageData } from './entities/image-data.schema';
import { ImageDataService } from './image-data.service';

// @UseGuards(JwtAuthGuard)
@Controller('image-data')
export class ImageDataController {
  constructor(private readonly imageDataService: ImageDataService) {}

  @HttpCode(200)
  @Post('create-many')
  async createManyImageData(
    @Body() payload: CreateManyImageDataDto,
  ): Promise<ImageData[]> {
    return await this.imageDataService.createManyImageData(payload);
  }
}
