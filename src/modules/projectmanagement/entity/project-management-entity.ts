import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectManagementDocument = ProjectManagement & Document;

@Schema({ collection: "project_laberu" })
export class ProjectManagement {
    @Prop({ required: true })
    project_name: string;

    @Prop({ required: true })
    labelType: string;

    @Prop({ required: true })
    labellingCount: number;

    @Prop({ required: true })
    baseImageUrl: string;

    @Prop({ required: true })
    priceEach: number;

    @Prop({ required: true })
    config: []

    @Prop()
    process: boolean;
}

export const ProjectManagementSchema = SchemaFactory.createForClass(ProjectManagement);