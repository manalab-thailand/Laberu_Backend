import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskSuccessObjectDocument = TaskSuccessObject & Document;

@Schema({ collection: "task_success" })
export class TaskSuccessObject {
    @Prop({ required: true })
    shortcode: string;

    @Prop()
    filename: string;

    @Prop()
    object: [];

    @Prop()
    time_start: string;

    @Prop()
    time_stop: string;

    @Prop()
    accept: boolean;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    task_id: string;
}

export const TaskSuccessObjectSchema = SchemaFactory.createForClass(TaskSuccessObject);