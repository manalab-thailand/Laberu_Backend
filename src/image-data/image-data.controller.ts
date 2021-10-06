import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageDataService } from './image-data.service';

@Controller('image-data')
export class ImageDataController {
  constructor(private readonly imageDataService: ImageDataService) {}
}
