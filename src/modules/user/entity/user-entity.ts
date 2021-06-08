import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ collection: "user" })
export class User {

    @Prop({ required: true })
    firstname: String;

    @Prop({ required: true })
    lastname: String;

    @Prop()
    birth: String;

    @Prop({ required: true })
    email: String;

    @Prop({ required: true })
    phonenumber: String;

    @Prop()
    career: String;

    @Prop()
    location: String;

    @Prop()
    province: String;

    @Prop({ required: true })
    status: String;

    @Prop({ required: true })
    uid: String;

}

export const UserSchema = SchemaFactory.createForClass(User);