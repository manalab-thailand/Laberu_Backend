import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskSuccessObjectDocument = TaskSuccessObject & Document;

@Schema({ collection: "task_success_object" })
export class TaskSuccessObject {
    @Prop({ required: true })
    shortcode: string;

    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    object: [];

    @Prop({ required: true })
    time_start: string;

    @Prop({ required: true })
    time_stop: string;

    @Prop({ required: true })
    accept: boolean;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    task_id: string;

    @Prop()
    payment: String;

    @Prop()
    paymentAt: Date;

    @Prop({ required: true })
    project_id: string;
}

export const TaskSuccessObjectSchema = SchemaFactory.createForClass(TaskSuccessObject);