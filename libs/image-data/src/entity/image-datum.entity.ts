import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type ImageDataDocument = ImageData & Document;

@Schema({ collection: "image_data" })
export class ImageData {
    @Prop({ required: true })
    shortcode: String;

    @Prop()
    annotation: {
        description_english: String,
    }

    @Prop()
    object: {
        size: {
            width: string,
            height: string,
        }
    }
}

export const ImageDataSchema = SchemaFactory.createForClass(ImageData);