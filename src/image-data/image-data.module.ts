import { Module } from '@nestjs/common';
import { ImageDataService } from './image-data.service';
import { ImageDataController } from './image-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageDataSchema, ImageDatum } from './entities/image-datum.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: ImageDatum.name, schema: ImageDataSchema }])],
  controllers: [ImageDataController],
  providers: [ImageDataService]
})
export class ImageDataModule { }
