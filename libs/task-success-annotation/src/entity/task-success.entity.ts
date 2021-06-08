import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskSuccessAnnotationDocument = TaskSuccessAnnotation & Document;

@Schema({ collection: "task_success" })
export class TaskSuccessAnnotation {
    @Prop({ required: true })
    shortcode: String;

    @Prop({ required: true })
    description: String;

    @Prop({ required: true })
    time_start: String;

    @Prop({ required: true })
    time_stop: String;

    @Prop({ required: true })
    accept: Boolean;

    @Prop({ required: true })
    user_id: String;

    @Prop({ required: true })
    task_id: String;

    @Prop({ required: true })
    project_id: String;
}

export const TaskSuccessAnnotationSchema = SchemaFactory.createForClass(TaskSuccessAnnotation);