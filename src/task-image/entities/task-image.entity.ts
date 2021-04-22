import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose";

export type TaskImageDocument = TaskImage & Document;

@Schema({ collection: "task_image" })
export class TaskImage {
    @Prop()
    shortcode: String;

    @Prop()
    time_start: String;

    @Prop()
    status: Boolean;

    @Prop()
    process: Boolean;

}

export const TaskImageSchema = SchemaFactory.createForClass(TaskImage);