import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ProjectLabelType,
  ProjectImageType,
  ProjectType,
  ProjectProcess,
} from '../interface/project.enum';
import {
  ICustomAttribute,
  IProjectConfigInput,
} from '../interface/project.interface';

export type ProjectDocument = Project & Document;

@Schema({ collection: 'project', versionKey: false })
export class Project {
  @Prop({ required: true })
  project_name: string;

  @Prop({ required: true })
  project_desc: string;

  @Prop({ type: ProjectType, enum: () => ProjectType })
  project_type: ProjectType;

  @Prop({ type: ProjectLabelType, enum: () => ProjectLabelType })
  label_type: ProjectLabelType;

  @Prop({ type: ProjectImageType, enum: () => ProjectImageType })
  image_type: ProjectImageType;

  @Prop({ required: true })
  base_image_url: string;

  @Prop({ required: true })
  label_count: number;

  @Prop({ required: true })
  price_image: number;

  @Prop({ required: true })
  require_custom: boolean;

  @Prop({ type: Object as () => ICustomAttribute[], required: false })
  custom_attribute: ICustomAttribute[];

  @Prop({ type: Object as () => IProjectConfigInput[], required: true })
  config_input: IProjectConfigInput;

  @Prop({ type: ProjectProcess, enum: () => ProjectProcess })
  process: ProjectProcess;

  @Prop({ required: true })
  project_owner: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop()
  update_by: string | null;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
