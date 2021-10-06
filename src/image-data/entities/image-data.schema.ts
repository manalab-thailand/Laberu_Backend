import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IAnnotation,
  IClassification,
  IObject,
} from '../interface/image-data.interface';

export type ImageDataDocument = ImageData & Document;

@Schema({ collection: 'image_data' })
export class ImageData {
  @Prop({ required: true })
  shortcode: string;

  @Prop({ required: false })
  annotation: IAnnotation;

  @Prop({ required: false })
  object: IObject;

  @Prop({ required: false })
  classification: IClassification;

  @Prop({ required: true })
  project_id: string;

  @Prop({})
  createAt: Date;
}

export const ImageDataSchema = SchemaFactory.createForClass(ImageData);
