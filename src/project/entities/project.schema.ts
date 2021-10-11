import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ProjectLabelType,
  ProjectImageType,
  ProjectType,
  ProjectProcess,
} from '../interface/project.enum';
import { IProjectConfigInput } from '../interface/project.interface';

export type ProjectDocument = Project & Document;

@Schema({ collection: 'project' })
export class Project {
  @Prop({ required: true })
  project_name: string;

  @Prop({ required: true })
  project_desc: string;

  @Prop({ enum: () => ProjectType })
  project_type: ProjectType;

  @Prop({ enum: () => ProjectLabelType })
  label_type: ProjectLabelType;

  @Prop({ enum: () => ProjectImageType })
  image_type: ProjectImageType;

  @Prop({ required: true })
  base_image_url: string;

  @Prop({ required: true })
  label_count: number;

  @Prop({ required: true })
  price_image: number;

  @Prop({ required: true })
  require_custom: boolean;

  @Prop({ required: true })
  config_input: IProjectConfigInput;

  @Prop({ enum: () => ProjectProcess })
  process: ProjectProcess;

  @Prop({ required: true })
  project_owner: string;

  @Prop({ required: true })
  createAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
