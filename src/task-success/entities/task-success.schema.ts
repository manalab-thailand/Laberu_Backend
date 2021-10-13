import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaymentStatus } from '../interface/task-success.enum';
import { ICustom, IResult } from '../interface/task-success.interface';

export type TaskSuccessDocument = TaskSuccess & Document;

@Schema({ collection: 'task_success', versionKey: false })
export class TaskSuccess {
  @Prop({ required: true })
  shortcode: string;

  @Prop({ required: true })
  accept: boolean;

  @Prop({ type: Object as () => IResult, required: true })
  result: IResult;

  @Prop({ required: true })
  task_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  project_id: string;

  @Prop({ type: Object as () => ICustom })
  custom: ICustom;

  @Prop({ type: PaymentStatus, enum: () => PaymentStatus })
  payment_status: PaymentStatus;

  @Prop()
  paymentAt: Date;

  @Prop({ required: true })
  startedAt: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  update_by: string;
}

export const TaskSuccessSchema = SchemaFactory.createForClass(TaskSuccess);
