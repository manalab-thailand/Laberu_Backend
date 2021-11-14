import { Module } from '@nestjs/common';
import { ImageDataService } from './image-data.service';
import { ImageDataController } from './image-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageData, ImageDataSchema } from './entities/image-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageData.name, schema: ImageDataSchema },
    ]),
  ],
  controllers: [ImageDataController],
  providers: [ImageDataService],
})
export class ImageDataModule {}
