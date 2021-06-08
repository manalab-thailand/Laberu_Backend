import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose";

export type TaskImageAnnotationDocument = TaskImageAnnotation & Document;

@Schema({ collection: "task_image" })
export class TaskImageAnnotation {
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

export const TaskImageAnnotationSchema = SchemaFactory.createForClass(TaskImageAnnotation);