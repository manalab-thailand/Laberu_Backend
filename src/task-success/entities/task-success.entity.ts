import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskSuccessDocument = TaskSuccess & Document;

@Schema({ collection: "task_success" })
export class TaskSuccess {
    @Prop({ required: true })
    shortcode: String;

    @Prop()
    description: String;

    @Prop()
    time_start: String;

    @Prop()
    time_stop: String;

    @Prop()
    accept: Boolean;

    @Prop({ required: true })
    user_id: String;

    @Prop({ required: true })
    task_id: String;
}

export const TaskSuccessSchema = SchemaFactory.createForClass(TaskSuccess);