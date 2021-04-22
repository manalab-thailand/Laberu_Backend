import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ collection: "project" })
export class Project {
    @Prop()
    project_name: String;

    @Prop()
    labelType: String;

    @Prop()
    labelingCount: String;

    @Prop()
    baseImageUrl: String;

    @Prop()
    customerID: String;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);