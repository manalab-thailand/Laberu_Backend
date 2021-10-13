import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IAnnotation,
  IClassification,
  ILabelling,
} from '../interface/image-data.interface';

export type ImageDataDocument = ImageData & Document;

@Schema({ collection: 'image_data', versionKey: false })
export class ImageData {
  @Prop({ required: true })
  shortcode: string;

  @Prop({ type: Object as () => IAnnotation, required: false })
  annotation: IAnnotation;

  @Prop({ type: Object as () => ILabelling, required: false })
  labelling: ILabelling;

  @Prop({ type: Object as () => IClassification, required: false })
  classification: IClassification;

  @Prop({ required: true })
  project_id: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  update_by: string | null;
}

export const ImageDataSchema = SchemaFactory.createForClass(ImageData);
