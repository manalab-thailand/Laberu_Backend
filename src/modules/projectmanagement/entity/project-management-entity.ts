import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectManagementDocument = ProjectManagement & Document;

@Schema({ collection: "project" })
export class ProjectManagement {
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

export const ProjectManagementSchema = SchemaFactory.createForClass(ProjectManagement);