import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type ImageDataDocument = ImageData & Document;

@Schema({ collection: "image_data" })
export class ImageData {
    @Prop({ required: true })
    shortcode: String;

    @Prop({ type: {} })
    annotation: {
        description_english: String,
    }

    @Prop({ type: {} })
    object: {
        size: {
            width: string,
            height: string,
        }
    }

    @Prop()
    project_id: string
}

export const ImageDataSchema = SchemaFactory.createForClass(ImageData);