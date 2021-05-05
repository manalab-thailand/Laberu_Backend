import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose";

export type TesterDocument = Tester & Document;

@Schema()
export class Tester {
    @Prop()
    shortcode: String;

    @Prop()
    clientID: String;
}

export const TesterSchema = SchemaFactory.createForClass(Tester);