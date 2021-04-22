import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ collection: "user" })
export class User {

    @Prop({ required: true })
    fname: String;

    @Prop({ required: true })
    lname: String;

    @Prop({ required: true })
    age: String;

    @Prop({ required: true })
    email: String;

    @Prop({ required: true })
    phone_number: String;

    @Prop({ required: true })
    uid: String;

}

export const UserSchema = SchemaFactory.createForClass(User);