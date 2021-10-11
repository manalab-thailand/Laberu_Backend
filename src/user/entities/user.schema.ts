import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, UserStatus } from '../interface/user.enum';
import { IUserPayment } from '../interface/user.interface';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop()
  career: string;

  @Prop()
  province: string;

  @Prop({ enum: () => UserStatus })
  status: UserStatus;

  @Prop({ enum: () => UserRole })
  role: UserRole;

  @Prop({ required: true })
  uid: string;

  @Prop()
  payment: IUserPayment;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  update_by: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
