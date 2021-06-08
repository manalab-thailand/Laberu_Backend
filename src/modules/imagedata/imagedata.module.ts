import { Module } from '@nestjs/common';
import { ImagedataService } from './imagedata.service';
import { ImagedataController } from './imagedata.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageData, ImageDataSchema } from './entity/image-datum.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: ImageData.name, schema: ImageDataSchema }])],
  controllers: [ImagedataController],
  providers: [ImagedataService]
})
export class ImagedataModule { }
