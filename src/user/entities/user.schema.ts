import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, UserStatus } from '../interface/user.enum';
import { IUserPayment } from '../interface/user.interface';

export type UserDocument = User & Document;

@Schema({ collection: 'user', versionKey: false })
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

  @Prop({ type: UserStatus, enum: () => UserStatus })
  status: UserStatus;

  @Prop({ type: UserRole, enum: () => UserRole })
  role: UserRole;

  @Prop({ required: true })
  uid: string;

  @Prop({ type: Object as () => IUserPayment })
  payment: IUserPayment;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  update_by: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
