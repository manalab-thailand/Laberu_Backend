import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  TaskImageProcess,
  TaskImageStatus,
} from '../interface/task-image.enum';

export type TaskImageDocument = TaskImage & Document;

@Schema({ collection: 'task_image' })
export class TaskImage {
  @Prop({ required: true })
  shortcode: string;

  @Prop({ type: TaskImageStatus, enum: () => TaskImageStatus })
  status: TaskImageStatus;

  @Prop({ type: TaskImageProcess, enum: () => TaskImageProcess })
  process: TaskImageProcess;

  @Prop()
  doingAt: Date | null;

  @Prop()
  doneAt: Date | null;

  @Prop({ required: true })
  project_id: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const TaskImageSchema = SchemaFactory.createForClass(TaskImage);
