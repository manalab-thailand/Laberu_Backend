import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/entities/user.schema';

export type TaskImageRejectDocument = TaskImageReject & mongoose.Document;

@Schema({ collection: 'task_image_reject', versionKey: false })
export class TaskImageReject {
  @Prop({ required: true })
  shortcode: string;

  @Prop()
  status: string;

  @Prop()
  new_result: string;

  @Prop({ required: true })
  user_id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  task_success_id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  project_id: mongoose.Types.ObjectId;

  @Prop()
  approve_by: User | null;

  @Prop()
  reject_by: User | null;

  @Prop()
  approvedAt: Date | null;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date | null;
}

export const TaskImageRejectSchema = SchemaFactory.createForClass(
  TaskImageReject,
);
