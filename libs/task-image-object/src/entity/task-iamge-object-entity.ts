import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose";

export type TaskImageObjectDocument = TaskImageObject & Document;

@Schema({ collection: "task_image_object" })
export class TaskImageObject {
    @Prop()
    shortcode: string;

    @Prop()
    time_start: string;

    @Prop()
    status: boolean;

    @Prop()
    process: boolean;

    @Prop()
    project_id: string;
}

export const TaskImageObjectSchema = SchemaFactory.createForClass(TaskImageObject);